const Item = require('./Item');

const BRIE = 'Aged Brie';
const PASSES = "Backstage passes to a TAFKAL80ETC concert";
const LEGENDARY_ITEM = 'Sulfuras, Hand of Ragnaros';
const isSpecialItem = item => item.name === "Aged Brie" || item.name === "Backstage passes to a TAFKAL80ETC concert";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0
const DAYS_TO_DOUBLE_QUALITY = 10;
const DAYS_TO_TRIPLE_QUALITY = 5;

class GildedRose {
  increaseQuality (item, quantity=1) {
    if(item.quality + quantity < MAX_QUALITY){
      item.quality += quantity;
    }else{
      item.quality = MAX_QUALITY;
    }
  }
  decreaseQuality(item, quantity=1){
    if(item.quality > MIN_QUALITY){
      item.quality -= quantity;
    }
  }
  updateRegularItemQuality(item){
      this.decreaseQuality(item, 1);
    if (item.sellIn < 0) {
      this.decreaseQuality(item, 1);
    }
  }
  updateLegendaryItemQuality(item){
    //No need for this function cause it never changes
  }

  updateSpecialItemQuality(item){
    if (item.sellIn <= DAYS_TO_TRIPLE_QUALITY){
      this.increaseQuality(item, 3);
    } else if (item.sellIn <= DAYS_TO_DOUBLE_QUALITY) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateConjuredItem(item){
    this.updateRegularItemQuality(item, 2);
  }

  updateItemQuality(item){
    if(item.name === LEGENDARY_ITEM) return;
    item.sellIn -= 1;
    if (isSpecialItem(item)){
      this.updateSpecialItemQuality(item)
    }else{
      this.updateRegularItemQuality(item);
    }     
  }

  updateQuality(items) {
    for (let i = 0; i < items.length; i++) {
      this.updateItemQuality(items[i]);
    }
    return items;
  }
}
module.exports = new GildedRose();