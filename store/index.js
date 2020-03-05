// function for Mock API
const sleep = m => new Promise(r => setTimeout(r, m))
const categories = [
  {
    id: 'cats',
    cTitle: 'Котики',
    cName: 'Котики',
    cSlug: 'cats',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats',
    products: []
  },
  {
    id: 'dogs',
    cTitle: 'Собачки',
    cName: 'Собачки',
    cSlug: 'dogs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs',
    products: []
  },
  {
    id: 'wolfs',
    cTitle: 'Волчки',
    cName: 'Волчки',
    cSlug: 'wolfs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?wolf',
    products: []
  },
  {
    id: 'bulls',
    cTitle: 'Бычки',
    cName: 'Бычки',
    cSlug: 'bulls',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?bull',
    products: []
  }
]
function getProduct (products, productsImages, productSlug) {
  const innerProduct = products.find(p => p.pSlug === productSlug)
  if (!innerProduct) return null
  return {
    ...innerProduct,
    images: productsImages.find(img => img.id === innerProduct.id).urls,
    category: categories.find(cat => cat.id === innerProduct.category_id)
  }
}
function addProductsToCategory (products, productsImages, category) {
  const categoryInner = { ...category, products: [] }
  products.map(p => {
    if (p.category_id === category.id) {
      categoryInner.products.push({
        id: p.id,
        pName: p.pName,
        pSlug: p.pSlug,
        pPrice: p.pPrice,
        image: productsImages.find(img => img.id === p.id).urls
      })
    }
  })
  return categoryInner
}
function getBreadcrumbs (pageType, route, data) {
  const crumbs = []
  crumbs.push({
    title: 'Главная',
    url: '/'
  })
  switch (pageType) {
    case 'category':
      crumbs.push({
        title: data.cName,
        url: `/category/${data.cSlug}`
      })
      break
    case 'product':
      crumbs.push({
        title: data.category.cName,
        url: `/category/${data.category.cSlug}`
      })
      crumbs.push({
        title: data.pName,
        url: `/product/${data.pSlug}`
      })

      break

    default:
      break
  }
  return crumbs
}
export const state = () => ({
  categoriesList: [],
  currentCategory: {},
  currentProduct: {},
  bredcrumbs: []
})
export const mutations = {
  SET_CATEGORIES_LIST (state, categories) {
    state.categoriesList = categories
  },
  SET_CURRENT_CATEGORY (state, category) {
    state.currentCategory = category
  },
  SET_CURRENT_PRODUCT (state, product) {
    state.currentProduct = product
  },
  SET_BREADCRUMBS (state, crumbs) {
    state.bredcrumbs = crumbs
  },
  RESET_BREADCRUMBS (state) {
    state.bredcrumbs = []
  }
}
export const actions = {
  async setBreadcrumbs ({ commit }, data) {
    await commit('SET_BREADCRUMBS', data)
  },
  async getCategoriesList ({ commit }) {
    try {
      await sleep(300)
      await commit('SET_CATEGORIES_LIST', categories)
    } catch (err) {
      console.log(err)
      throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    }
  },
  async getCurrentCategory ({ commit, dispatch }, { route }) {
    await sleep(300)
    const category = categories.find((cat) => cat.cSlug === route.params.CategorySlug)

    const [products, productsImages] = await Promise.all(
      [
        this.$axios.$get('/mock/products.json'),
        this.$axios.$get('/mock/products-images.json')
      ]
    )
    const crubms = getBreadcrumbs('category', route, category)
    await dispatch('setBreadcrumbs', crubms)

    await commit('SET_CURRENT_CATEGORY', addProductsToCategory(products, productsImages, category))
  },
  async getCurrentProduct ({ commit, dispatch }, { route }) {
    await sleep(300)
    const productSlug = route.params.ProductSlug
    const [products, productsImages] = await Promise.all(
      [
        this.$axios.$get('/mock/products.json'),
        this.$axios.$get('/mock/products-images.json')
      ]

    )
    const product = getProduct(products, productsImages, productSlug)
    const crubms = getBreadcrumbs('product', route, product)
    await dispatch('setBreadcrumbs', crubms)
    await commit('SET_CURRENT_PRODUCT', product)
  }

}
