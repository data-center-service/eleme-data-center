export namespace IEleme {

    export interface Food {
        'rating': number;
        'is_featured': 0 | 1;
        'virtual_food_id': number;
        'cold_box': null;
        'restaurant_id': number;
        'pinyin_name': string;
        'display_times': {};
        // 属性, 例如 甜度: [多冰,去冰] 之类的
        'attrs': {
            'values': string[],
            'name': string,
        }[];
        'description': string;
        // 月销售数量
        'month_sales': number;
        'rating_count': number;
        'tips': string;
        'image_path': string;
        // 规格, 例如 大小: [大杯,小杯] 之类的
        'specifications': {
            'values': string[],
            'name': string,
        }[];
        'server_utc': number;
        'is_essential': boolean;
        'attributes': {
            'icon_name': string,
            'icon_color': string,
        }[];
        'item_id': number;
        // 最少购买件数
        'min_purchase': number;
        'limitation': {};
        'name': string;
        'satisfy_count': number;
        'activity': null;
        'satisfy_rate': number;
        'specfoods': {
            'original_price': null,
            'sku_id': number,
            // 食物名称
            'name': string,
            'weight': number,
            'virtual_food_id': number,
            'pinyin_name': string,
            'restaurant_id': number,
            'food_id': number,
            'packing_fee': number,
            'recent_rating': number,
            'promotion_stock': number,
            'price': number,
            // 是否售空
            'sold_out': boolean,
            'recent_popularity': number,
            'is_essential': boolean,
            'item_id': string,
            'checkout_mode': 1,
            'specs': {
                'name': string,
                'value': string,
            }[],
            'partial_reduce_activity_id': null,
            'stock': number,
        }[];
        'category_id': number;
    }

    export interface Menu {
        'description': string;
        'is_selected': boolean;
        'icon_url': string;
        'global_id': null;
        'name': string;
        'grey_icon_url': string;
        'foods': Food[];
        'activity': null;
        'type': number;
        'id': number;
        'is_activity': null;
    }

    export interface Shop {
        // 优惠活动
        'activities': {
            // 折扣
            'attribute': { [price: string]: { '1': number, '0': number } } | number,
            'description': string, // 描述
            'id': number,
            'is_exclusive_with_food_activity': boolean,
            'name': string,
            'tips': string,
            'type': number,
        }[];
        // 商家具体地址
        'address': string;
        'authentic_id': number;
        'description': string;
        // 可能是米
        'distance': number;
        'favored': boolean;
        'flavors': { id: number, name: string }[];
        'float_delivery_fee': number;
        'float_minimum_order_amount': number;
        'has_story': boolean;
        'id': number;
        // 可能是 LOGO 地址, eleme接口
        'image_path': string;
        'is_new': boolean;
        'is_premium': boolean;
        'is_stock_empty': 0 | 1;
        'is_valid': 0 | 1;
        'latitude': number;
        'longitude': number;
        'max_applied_quantity_per_order': number;
        'name': string;
        'next_business_time': string;
        'only_use_poi': boolean;
        'opening_hours': string[];
        'order_lead_time': number;
        'phone': string;
        // 可能和配送费有关
        'piecewise_agent_fee': {
            'description': string,
            'extra_fee': number,
            'is_extra': boolean,
            'rules': {
                'fee': number, // 可能是配送费
                'price': number, // 可能是起送费
            }[],
            'tips': string,
        };
        'platform': 0;
        'posters': any[];
        'promotion_info': string;
        'rating': number;
        'rating_count': number;
        'recent_order_num': number;
        'recommend': {
            'is_ad': boolean,
            'reason': string,
        };
        'recommend_reasons': {
            'name': string,
        }[];
        'regular_customer_count': number;
        // 饿了么URL协议
        'scheme': string;
        'status': 0 | 1;
        'support_tags': any[];
        'supports': any[];
        'type': number;
    }

}