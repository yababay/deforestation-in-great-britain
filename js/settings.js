const ENGLAND_SQUARE = 133_396 // Площадь Англии
const BRITAIN_SQUARE = 242_495 // Площадь Великобритании

const WOOD_PRODUCTIVITY = 150 // куб. м. с га
const WOOD_DENSITY = 1540 // кг на куб. м
const WOOD_PRODUCTIVITY_KM_KG = WOOD_PRODUCTIVITY * WOOD_DENSITY * 100 // = 23100 тонн древесины с кв. км

const IRON_PRODUCTION_PER_FURNACE = 4 * 100 * 356 // 4 крицы по 100 кг в день 
const WOOD_CONSUMPTION_PER_FURNACE = IRON_PRODUCTION_PER_FURNACE * 50 //  = 7300 тонн 
const DEFORESTATION_SPEED_PER_FURNACE = WOOD_CONSUMPTION_PER_FURNACE / WOOD_PRODUCTIVITY_KM_KG  // 0,316 кв. км в год - скорость потребления древесины на один горн в год

const COUNTY_COUNT = 48 // количество графств в Англии
