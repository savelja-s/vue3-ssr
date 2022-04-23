export interface PreorderComicInterface {
    id?: string;
    slug?: string;
    title?: string;
    publisher?: PublisherInterface;
    writer?: WriterInterface;
    artist?: ArtistInterface;
    description?: string;
    image?: string;
    price_usd?: number;
    price_grn?: number;
    expected_ship_at?: number;
}

export interface ImageInterface {
    id: string;
    status: boolean;
    image: string;
}

export interface ComicInterface {
    id?: string;
    status: boolean;
    slug?: string;
    title?: string;
    publisher?: PublisherInterface;
    writer?: WriterInterface;
    artist?: ArtistInterface;
    description?: string;
    images: ImageInterface[];
    price_usd?: number;
    created_at?: any;
}

export interface PublisherInterface {
    name?: string;
    slug?: string;
    count?: number;
}

export interface WriterInterface {
    name?: string;
    id?: string;
}

export interface ArtistInterface {
    name: string;
    id: string;
}

export class PreorderComic implements PreorderComicInterface {
    public id?: string;
    public slug?: string;
    public title?: string;
    public publisher?: PublisherInterface;
    public description?: string;
    public image?: string;
    public price_usd?: number;
    public price_grn?: number;
    public expected_ship_at?: number;

    public constructor(
        id?: string,
        slug?: string,
        title?: string,
        publisher?: PublisherInterface,
        description?: string,
        image?: string,
        price_usd?: number,
        price_grn?: number,
        expected_ship_at?: number
    ) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.image = image;
        this.price_usd = price_usd;
        this.price_grn = price_grn;
        this.expected_ship_at = expected_ship_at;
        this.publisher = publisher;
    }
}


export interface CartItemInterface {
    product: PreorderComic;
    quantity: number;
    price: number;
    product_type: string;
    added_at: any;
}

export class CartItem implements CartItemInterface {
    public product: PreorderComic;
    public quantity: number;
    public price: number;
    public product_type: string;
    public added_at: any;

    public constructor(
        product: PreorderComic,
        price: number,
        product_type: string,
        added_at: any,
        quantity = 1
    ) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.product_type = product_type;
        this.added_at = added_at;
    }
}

export class Cart {
    public items: CartItem[];

    public constructor(items: CartItem[] = []) {
        this.items = items;
    }
}
