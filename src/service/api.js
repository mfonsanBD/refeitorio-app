import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/`,
});

export default {
  getCategoriesList: async () => {
    let resposta;

    await api.get('categoria').then((response) => {
      resposta = response.data;
    });

    return resposta;
  },

  insertCategory: async (nome) => {
    let resposta;

    await api.post('categoria', {nome}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  updateCategory: async (nome, id) => {
    let resposta;

    await api.put('categoria', {id, nome}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  deleteCategory: async (id) => {
    let resposta;

    await api.delete(`deletacategoria/${id}`)
    .then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });
    
    return resposta;
  },

  getDishList: async () => {
    let resposta;

    await api.get('listatodosospratos').then((response) => {
      resposta = response.data;
    });

    return resposta;
  },

  insertDish: async (nome, categoria_id, vegano, lactose, gluten) => {
    let resposta;

    await api.post('prato', {nome, categoria_id, vegano, lactose, gluten}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  updateDish: async (nome, categoria_id, vegano, lactose, gluten, id) => {
    let resposta;

    await api.put('atualizaprato', {
      nome,
      categoria_id,
      vegano,
      lactose,
      gluten,
      id
    }, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  updateDishStatus: async (status, id) => {
    let resposta;
    await api.put('atualizaprato', {
      status,
      id
    }, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },
  
  deleteDish: async (id) => {
    let resposta;

    await api.delete(`deletaprato/${id}`)
    .then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });
    
    return resposta;
  },

  getCategoryDishes: async () => {
    let resposta;

    await api.get('categoriapratos').then((response) => {
      resposta = response.data;
    });

    return resposta;
  },

  getMenuDishes: async () => {
    let resposta;

    await api.get('cardapiodia').then((response) => {
      resposta = response.data;
    });

    return resposta;
  },
  
  saveMenu: async (id) => {
    let resposta;

    await api.post('cardapioprato', {id}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  deleteMenu: async (id) => {
    let resposta;

    await api.delete(`deletapratocardapio/${id}`)
    .then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });
    
    return resposta;
  },
}