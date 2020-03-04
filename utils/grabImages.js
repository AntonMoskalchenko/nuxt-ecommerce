const products = require('../static/mock/products.json')

const got = require('got')
const QS = require('querystring')
const API_KEY = '15479263-4ccd4e4421b71313e34934a50'

const fs = require('fs')
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile)

async function fetchApiImg (searchQuery) {
  try {
    const query = QS.stringify({ key: API_KEY, q: searchQuery, per_page: '3', image_type: 'photo' })
    const resPr = got(`https://pixabay.com/api/?${query}`)
    const json = await resPr.json()
    if (json.hits && json.hits.length > 0 && json.hits[0].largeImageURL && json.hits[0].webformatURL) {
      return {
        imgXL: json.hits[0].largeImageURL,
        imgL: json.hits[0].webformatURL
      }
    } else {
      throw 'no image'
    }
  } catch (error) {
    return {
      imgXL: null,
      imgL: null
    }
  }
}
async function getImagesUrls () {
  const imagesUrl = []
  await Promise.all(
    products.map(async product => {
      const productName = product.pName.split(' ')[0]
      const imgUrls = await fetchApiImg(productName)
      imagesUrl.push({ id: product.id, urls: imgUrls })
    })
  )
  return imagesUrl
}
async function main () {
  try {
    const imagesUrls = await getImagesUrls()
    await writeFileAsync('./static/mock/products-images.json', JSON.stringify(imagesUrls), { flag: 'w+' })
  } catch (error) {
    console.log(error)
  }
}
main()
