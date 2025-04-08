export type transforms = {
    [key: string]: any;
    delimiter(): string;
    header(block: block): string;
    paragraph(block: block): string;
    list(block: block): string;
    image(block: block): string;
    quote(block: block): string;
    code(block: block): string;
    embed(block: block): string;
    raw(block: block): string;
};
type ListItem = {
    content: string;
    items: Array<ListItem>;
};
export type block = {
    type: string;
    data: {
        text?: string;
        html?: string;
        level?: number;
        caption?: string;
        url?: string;
        file?: {
            url?: string;
        };
        stretched?: boolean;
        withBackground?: boolean;
        withBorder?: boolean;
        items?: Array<string> | Array<ListItem>;
        style?: string;
        code?: string;
        service?: "youtube" | "twitter" | "x.com" | "instagram" | "facebook" | "t.me";
        source?: string;
        embed?: string;
        width?: number;
        height?: number;
        alignment?: "left" | "right" | "center" | "justify";
        align?: "left" | "right" | "center" | "justify";
    };
};
declare const transforms: transforms;
export default transforms;
