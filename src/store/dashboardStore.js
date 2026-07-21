import { create } from "zustand";
import api from "../services/api";

const initialState = {
  hero: {},
  about: {},
  history: [],
  agenda: [],
  gallery: [],
  instagram: {},
  songs: [],
  repertoire: [],
  testimonials: [],
  partners: [],
  newsletter: {},
  contact: {},
  seo: {},
  settings: {},
  loading: false,
  initialized: false,
};

export const useDashboardStore = create((set, get) => ({
  ...initialState,

  initialize: async () => {
    if (get().initialized) return;
    set({ loading: true });
    try {
      const data = await api.getHomeData();
      set({
        hero: data.hero,
        about: data.about,
        history: data.history,
        agenda: data.agenda,
        gallery: data.gallery,
        instagram: data.instagram,
        songs: data.songs,
        repertoire: data.repertoire,
        testimonials: data.testimonials,
        partners: data.partners,
        newsletter: data.newsletter,
        contact: data.contact,
        seo: data.seo,
        settings: data.settings,
        initialized: true,
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateHero: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateHero(data);
      set({ hero: updated });
    } finally {
      set({ loading: false });
    }
  },

  updateAbout: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateAbout(data);
      set({ about: updated });
    } finally {
      set({ loading: false });
    }
  },

  loadHistory: async () => {
    set({ loading: true });
    try {
      const items = await api.getHistory();
      set({ history: items });
    } finally {
      set({ loading: false });
    }
  },

  addHistoryItem: async (item) => {
    set({ loading: true });
    try {
      const newItem = await api.addHistoryItem(item);
      set((state) => ({ history: [...state.history, newItem] }));
    } finally {
      set({ loading: false });
    }
  },

  updateHistoryItem: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateHistoryItem(id, data);
      set((state) => ({
        history: state.history.map((item) => (item.id === id ? updated : item)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteHistoryItem: async (id) => {
    set({ loading: true });
    try {
      await api.deleteHistoryItem(id);
      set((state) => ({
        history: state.history.filter((item) => item.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  reorderHistoryItems: async (items) => {
    set({ loading: true });
    try {
      await api.reorderHistoryItems(items);
      set({ history: items });
    } finally {
      set({ loading: false });
    }
  },

  loadAgenda: async () => {
    set({ loading: true });
    try {
      const items = await api.getAgenda();
      set({ agenda: items });
    } finally {
      set({ loading: false });
    }
  },

  addAgendaItem: async (item) => {
    set({ loading: true });
    try {
      const newItem = await api.addAgendaItem(item);
      set((state) => ({ agenda: [...state.agenda, newItem] }));
    } finally {
      set({ loading: false });
    }
  },

  updateAgendaItem: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateAgendaItem(id, data);
      set((state) => ({
        agenda: state.agenda.map((item) => (item.id === id ? updated : item)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteAgendaItem: async (id) => {
    set({ loading: true });
    try {
      await api.deleteAgendaItem(id);
      set((state) => ({
        agenda: state.agenda.filter((item) => item.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  loadGallery: async () => {
    set({ loading: true });
    try {
      const items = await api.getGallery();
      set({ gallery: items });
    } finally {
      set({ loading: false });
    }
  },

  addGalleryItem: async (item) => {
    set({ loading: true });
    try {
      const newItem = await api.addGalleryItem(item);
      set((state) => ({ gallery: [...state.gallery, newItem] }));
    } finally {
      set({ loading: false });
    }
  },

  updateGalleryItem: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateGalleryItem(id, data);
      set((state) => ({
        gallery: state.gallery.map((item) => (item.id === id ? updated : item)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteGalleryItem: async (id) => {
    set({ loading: true });
    try {
      await api.deleteGalleryItem(id);
      set((state) => ({
        gallery: state.gallery.filter((item) => item.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  reorderGalleryItems: async (items) => {
    set({ loading: true });
    try {
      await api.reorderGalleryItems(items);
      set({ gallery: items });
    } finally {
      set({ loading: false });
    }
  },

  loadInstagram: async () => {
    set({ loading: true });
    try {
      const data = await api.getInstagramSettings();
      set({ instagram: data });
    } finally {
      set({ loading: false });
    }
  },

  updateInstagram: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateInstagramSettings(data);
      set({ instagram: updated });
    } finally {
      set({ loading: false });
    }
  },

  loadSongs: async () => {
    set({ loading: true });
    try {
      const items = await api.getSongs();
      set({ songs: items });
    } finally {
      set({ loading: false });
    }
  },

  addSong: async (song) => {
    set({ loading: true });
    try {
      const newSong = await api.addSong(song);
      set((state) => ({ songs: [...state.songs, newSong] }));
    } finally {
      set({ loading: false });
    }
  },

  updateSong: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateSong(id, data);
      set((state) => ({
        songs: state.songs.map((s) => (s.id === id ? updated : s)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteSong: async (id) => {
    set({ loading: true });
    try {
      await api.deleteSong(id);
      set((state) => ({
        songs: state.songs.filter((s) => s.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  loadRepertoire: async () => {
    set({ loading: true });
    try {
      const items = await api.getRepertoire();
      set({ repertoire: items });
    } finally {
      set({ loading: false });
    }
  },

  addRepertoireCategory: async (category) => {
    set({ loading: true });
    try {
      const newCategory = await api.addRepertoireCategory(category);
      set((state) => ({ repertoire: [...state.repertoire, newCategory] }));
    } finally {
      set({ loading: false });
    }
  },

  updateRepertoireCategory: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateRepertoireCategory(id, data);
      set((state) => ({
        repertoire: state.repertoire.map((c) => (c.id === id ? updated : c)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteRepertoireCategory: async (id) => {
    set({ loading: true });
    try {
      await api.deleteRepertoireCategory(id);
      set((state) => ({
        repertoire: state.repertoire.filter((c) => c.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  loadTestimonials: async () => {
    set({ loading: true });
    try {
      const items = await api.getTestimonials();
      set({ testimonials: items });
    } finally {
      set({ loading: false });
    }
  },

  addTestimonial: async (testimonial) => {
    set({ loading: true });
    try {
      const newItem = await api.addTestimonial(testimonial);
      set((state) => ({ testimonials: [...state.testimonials, newItem] }));
    } finally {
      set({ loading: false });
    }
  },

  updateTestimonial: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updateTestimonial(id, data);
      set((state) => ({
        testimonials: state.testimonials.map((t) => (t.id === id ? updated : t)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteTestimonial: async (id) => {
    set({ loading: true });
    try {
      await api.deleteTestimonial(id);
      set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  loadPartners: async () => {
    set({ loading: true });
    try {
      const items = await api.getPartners();
      set({ partners: items });
    } finally {
      set({ loading: false });
    }
  },

  addPartner: async (partner) => {
    set({ loading: true });
    try {
      const newPartner = await api.addPartner(partner);
      set((state) => ({ partners: [...state.partners, newPartner] }));
    } finally {
      set({ loading: false });
    }
  },

  updatePartner: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await api.updatePartner(id, data);
      set((state) => ({
        partners: state.partners.map((p) => (p.id === id ? updated : p)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deletePartner: async (id) => {
    set({ loading: true });
    try {
      await api.deletePartner(id);
      set((state) => ({
        partners: state.partners.filter((p) => p.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  loadNewsletter: async () => {
    set({ loading: true });
    try {
      const data = await api.getNewsletter();
      set({ newsletter: data });
    } finally {
      set({ loading: false });
    }
  },

  updateNewsletter: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateNewsletter(data);
      set({ newsletter: updated });
    } finally {
      set({ loading: false });
    }
  },

  loadContact: async () => {
    set({ loading: true });
    try {
      const data = await api.getContact();
      set({ contact: data });
    } finally {
      set({ loading: false });
    }
  },

  updateContact: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateContact(data);
      set({ contact: updated });
    } finally {
      set({ loading: false });
    }
  },

  loadSEO: async () => {
    set({ loading: true });
    try {
      const data = await api.getSEO();
      set({ seo: data });
    } finally {
      set({ loading: false });
    }
  },

  updateSEO: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateSEO(data);
      set({ seo: updated });
    } finally {
      set({ loading: false });
    }
  },

  loadSettings: async () => {
    set({ loading: true });
    try {
      const data = await api.getSettings();
      set({ settings: data });
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (data) => {
    set({ loading: true });
    try {
      const updated = await api.updateSettings(data);
      set({ settings: updated });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
