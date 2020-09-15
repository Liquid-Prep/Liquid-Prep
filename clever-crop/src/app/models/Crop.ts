export class Crop {
    id: Number;
    title: string;
    description: string;
    url: string;

    constructor(id, title, description, url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
    }
}