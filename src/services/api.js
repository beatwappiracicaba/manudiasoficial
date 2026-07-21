import initialData from "../data/initialData";

let mockData = JSON.parse(JSON.stringify(initialData));

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getHomeData() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData));
  },

  async updateHero(data) {
    await delay(200);
    mockData.hero = { ...mockData.hero, ...data };
    return { ...mockData.hero };
  },

  async updateAbout(data) {
    await delay(200);
    mockData.about = { ...mockData.about, ...data };
    return { ...mockData.about };
  },

  async getHistory() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.history));
  },

  async addHistoryItem(item) {
    await delay(200);
    mockData.history.push({ ...item, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.history[mockData.history.length - 1]));
  },

  async updateHistoryItem(id, data) {
    await delay(200);
    const index = mockData.history.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.history[index] = { ...mockData.history[index], ...data };
      return { ...mockData.history[index] };
    }
    throw new Error("Item não encontrado");
  },

  async deleteHistoryItem(id) {
    await delay(200);
    mockData.history = mockData.history.filter((item) => item.id !== id);
    return { success: true };
  },

  async reorderHistoryItems(items) {
    await delay(200);
    mockData.history = items;
    return JSON.parse(JSON.stringify(mockData.history));
  },

  async getAgenda() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.agenda));
  },

  async addAgendaItem(item) {
    await delay(200);
    mockData.agenda.push({ ...item, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.agenda[mockData.agenda.length - 1]));
  },

  async updateAgendaItem(id, data) {
    await delay(200);
    const index = mockData.agenda.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.agenda[index] = { ...mockData.agenda[index], ...data };
      return { ...mockData.agenda[index] };
    }
    throw new Error("Item não encontrado");
  },

  async deleteAgendaItem(id) {
    await delay(200);
    mockData.agenda = mockData.agenda.filter((item) => item.id !== id);
    return { success: true };
  },

  async getGallery() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.gallery));
  },

  async addGalleryItem(item) {
    await delay(200);
    mockData.gallery.push({ ...item, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.gallery[mockData.gallery.length - 1]));
  },

  async updateGalleryItem(id, data) {
    await delay(200);
    const index = mockData.gallery.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.gallery[index] = { ...mockData.gallery[index], ...data };
      return { ...mockData.gallery[index] };
    }
    throw new Error("Item não encontrado");
  },

  async deleteGalleryItem(id) {
    await delay(200);
    mockData.gallery = mockData.gallery.filter((item) => item.id !== id);
    return { success: true };
  },

  async reorderGalleryItems(items) {
    await delay(200);
    mockData.gallery = items;
    return JSON.parse(JSON.stringify(mockData.gallery));
  },

  async getInstagramSettings() {
    await delay(200);
    return { ...mockData.instagram };
  },

  async updateInstagramSettings(data) {
    await delay(200);
    mockData.instagram = { ...mockData.instagram, ...data };
    return { ...mockData.instagram };
  },

  async getSongs() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.songs));
  },

  async addSong(song) {
    await delay(200);
    mockData.songs.push({ ...song, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.songs[mockData.songs.length - 1]));
  },

  async updateSong(id, data) {
    await delay(200);
    const index = mockData.songs.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockData.songs[index] = { ...mockData.songs[index], ...data };
      return { ...mockData.songs[index] };
    }
    throw new Error("Música não encontrada");
  },

  async deleteSong(id) {
    await delay(200);
    mockData.songs = mockData.songs.filter((s) => s.id !== id);
    return { success: true };
  },

  async getRepertoire() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.repertoire));
  },

  async addRepertoireCategory(category) {
    await delay(200);
    mockData.repertoire.push({ ...category, id: category.id || Date.now().toString() });
    return JSON.parse(JSON.stringify(mockData.repertoire[mockData.repertoire.length - 1]));
  },

  async updateRepertoireCategory(id, data) {
    await delay(200);
    const index = mockData.repertoire.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockData.repertoire[index] = { ...mockData.repertoire[index], ...data };
      return { ...mockData.repertoire[index] };
    }
    throw new Error("Categoria não encontrada");
  },

  async deleteRepertoireCategory(id) {
    await delay(200);
    mockData.repertoire = mockData.repertoire.filter((c) => c.id !== id);
    return { success: true };
  },

  async getTestimonials() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.testimonials));
  },

  async addTestimonial(testimonial) {
    await delay(200);
    mockData.testimonials.push({ ...testimonial, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.testimonials[mockData.testimonials.length - 1]));
  },

  async updateTestimonial(id, data) {
    await delay(200);
    const index = mockData.testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockData.testimonials[index] = { ...mockData.testimonials[index], ...data };
      return { ...mockData.testimonials[index] };
    }
    throw new Error("Depoimento não encontrado");
  },

  async deleteTestimonial(id) {
    await delay(200);
    mockData.testimonials = mockData.testimonials.filter((t) => t.id !== id);
    return { success: true };
  },

  async getPartners() {
    await delay(200);
    return JSON.parse(JSON.stringify(mockData.partners));
  },

  async addPartner(partner) {
    await delay(200);
    mockData.partners.push({ ...partner, id: Date.now() });
    return JSON.parse(JSON.stringify(mockData.partners[mockData.partners.length - 1]));
  },

  async updatePartner(id, data) {
    await delay(200);
    const index = mockData.partners.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockData.partners[index] = { ...mockData.partners[index], ...data };
      return { ...mockData.partners[index] };
    }
    throw new Error("Parceiro não encontrado");
  },

  async deletePartner(id) {
    await delay(200);
    mockData.partners = mockData.partners.filter((p) => p.id !== id);
    return { success: true };
  },

  async getNewsletter() {
    await delay(200);
    return { ...mockData.newsletter };
  },

  async updateNewsletter(data) {
    await delay(200);
    mockData.newsletter = { ...mockData.newsletter, ...data };
    return { ...mockData.newsletter };
  },

  async getContact() {
    await delay(200);
    return { ...mockData.contact };
  },

  async updateContact(data) {
    await delay(200);
    mockData.contact = { ...mockData.contact, ...data };
    return { ...mockData.contact };
  },

  async getSEO() {
    await delay(200);
    return { ...mockData.seo };
  },

  async updateSEO(data) {
    await delay(200);
    mockData.seo = { ...mockData.seo, ...data };
    return { ...mockData.seo };
  },

  async getSettings() {
    await delay(200);
    return { ...mockData.settings };
  },

  async updateSettings(data) {
    await delay(200);
    mockData.settings = { ...mockData.settings, ...data };
    return { ...mockData.settings };
  },
};

export default api;
