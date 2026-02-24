import React, { useEffect, useState } from 'react';
import { 
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Tag,
  DollarSign,
  X,
  Save
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { ServicePlan } from '../../types';
import { toast } from 'sonner';

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServicePlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    features: [''],
    description: ''
  });

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tekify_services')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch services");
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service?: ServicePlan) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price,
        features: service.features.length > 0 ? service.features : [''],
        description: service.description || ''
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        category: 'Digital Marketing',
        price: 0,
        features: [''],
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanFeatures = formData.features.filter(f => f.trim() !== '');
    const payload = { ...formData, features: cleanFeatures };

    try {
      if (editingService) {
        const { error } = await supabase
          .from('tekify_services')
          .update(payload)
          .eq('id', editingService.id);
        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase
          .from('tekify_services')
          .insert([payload]);
        if (error) throw error;
        toast.success("Service added successfully");
      }
      setShowModal(false);
      fetchServices();
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error(error.message || "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase
        .from('tekify_services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast.success("Service deleted");
      fetchServices();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete service");
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Services Catalog</h2>
          <p className="text-slate-500 font-medium mt-2">Manage your service offerings and pricing.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </header>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl group hover:border-primary-500 transition-all duration-500 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                  <Tag className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(service)}
                    className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">{service.name}</h3>
              <p className="text-xs font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-6">{service.category}</p>
              
              <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Price</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">₦{Number(service.price).toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Features ({service.features.length})</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Service Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                    placeholder="e.g. Premium SEO Package"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white"
                  >
                    <option value="Digital Marketing" className="dark:bg-slate-900">Digital Marketing</option>
                    <option value="Web Development" className="dark:bg-slate-900">Web Development</option>
                    <option value="App Development" className="dark:bg-slate-900">App Development</option>
                    <option value="Consulting" className="dark:bg-slate-900">Consulting</option>
                    <option value="Other" className="dark:bg-slate-900">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Price (₦)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Features</label>
                  <button 
                    type="button" 
                    onClick={handleAddFeature}
                    className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <input 
                        type="text" 
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                        placeholder="e.g. Keyword Research"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFeature(index)}
                        className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-8 py-5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-5 bg-primary-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Service</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
