import { numberAnimation } from './animation.js'

let range = document.querySelector('.price-range');
let pageview = document.querySelector('.top h2 span')
let price = document.querySelector('.price .price-num')
let priceSingleNum = document.querySelector('.price .price-num span')
let discountToggler = document.querySelector('.subs-option .subs-option__toggler')
let submitButton = document.querySelector('form button')

// - 10K pageviews / $8 per month
// - 50K pageviews / $12 per month
// - 100K pageviews / $16 per month
// - 500k pageviews / $24 per month
// - 1M pageviews / $36 per month

const priceMap = new Map()
priceMap
   .set('10K', 8)
   .set('50K', 12)
   .set('100K', 16)
   .set('500K', 24)
   .set('1M', 36)

const MAX_PAGEVIEWS = 1000000
let initialPrice = parseFloat(price.textContent.replace('$', ''))


// event listeners

range.addEventListener('input', () => {
   let currentPageview = sliderValueToCurrent()

   renderPageViews(currentPageview)
   calculatePrice(currentPageview)
   calculateDiscount()

   range.style.background = `linear-gradient(90deg, hsl(174deg, 77%, 80%) ${range.value}%, hsl(224deg, 65%, 95%) ${range.value}%)`
})

discountToggler.addEventListener('click', () => {
   calculateDiscount()
})

submitButton.addEventListener('click', event => {
   event.preventDefault()
   alert('Thanks')
})

// functions

function calculateDiscount() {
   let total = initialPrice

   if (discountToggler.checked === true) {
      let discount = initialPrice * 0.25
      total = initialPrice - discount
   }

   numberAnimation(priceSingleNum, total)
}

function calculatePrice(currentPageview) {
   initialPrice = 0
   if (currentPageview >= 10000) initialPrice = priceMap.get('10K')
   if (currentPageview >= 50000) initialPrice = priceMap.get('50K')
   if (currentPageview >= 100000) initialPrice = priceMap.get('100K')
   if (currentPageview >= 500000) initialPrice = priceMap.get('500K')
   if (currentPageview == 1000000) initialPrice = priceMap.get('1M')
}

function sliderValueToCurrent() {
   let sliderValueToPercent = parseFloat(range.value) / 100
   return MAX_PAGEVIEWS * sliderValueToPercent
}

function renderPageViews(currentPageview) {
   let pageviewString = currentPageview.toString().replace('000', 'K').replace('K', '')
   let PageViewStringIfMillion = pageviewString != '1000' ? `${pageviewString}K` : `${pageviewString.replace('000', '')}M`
   pageview.innerHTML = PageViewStringIfMillion
}