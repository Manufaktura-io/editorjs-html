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

const alignType = ["left", "right", "center", "justify"];

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

const transforms: transforms = {
    raw: ({data}) => {
        return data.html || "";
    },

    delimiter: () => {
        return `<br/>`;
    },

    header: ({data}) => {
        return `<h${data.level}>${data.text}</h${data.level}>`;
    },

    paragraph: ({data}) => {
        const paragraphAlign = data.alignment || data.align;

        if (typeof paragraphAlign !== "undefined" && alignType.includes(paragraphAlign)) {
            return `<p style="text-align:${paragraphAlign};">${data.text}</p>`;
        } else {
            return `<p>${data.text}</p>`;
        }
    },

    list: ({data}) => {
        const listStyle = data.style === "unordered" ? "ul" : "ol";

        const recursor = (items: any, listStyle: string) => {
            const list = items.map((item: any) => {
                if (!item.content && !item.items) return `<li>${item}</li>`;

                let list = "";
                if (item.items) list = recursor(item.items, listStyle);
                if (item.content) return `<li> ${item.content} ${list} </li>`;
            });

            return `<${listStyle}>${list.join("")}</${listStyle}>`;
        };

        return recursor(data.items, listStyle);
    },

    image: ({data}) => {
        let caption = data.caption ? data.caption : "";
        return `
        <img src="${data.file && data.file.url ? data.file.url : data.url}" alt="${caption}" />
        <div class="imageCaption"><i>${caption}</i></div>
        `;
    },

    quote: ({data}) => {
        return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
    },

    code: ({data}) => {
        return `<pre><code>${data.code}</code></pre>`;
    },

    embed: ({data}) => {
        switch (data.service) {
            case "t.me":
                const str = data.source?.split("/"),
                    // id_ = str ? `${str[3]}-${str[4]}` : "",
                    id = str ? `${str[3]}/${str[4]}` : "";
                // return `<div data-telegram="${id}" style="margin: 20px 0; width: 100%;"><script async data-telegram-post="${id}" src="https://telegram.org/js/telegram-widget.js?21" data-width="100%"></script></div>`;
                return `<div data-telegram="${id}" style="margin: 20px 0; width: 100%;"></div>`;
            case "twitter":
                return `<iframe width="${data.width}" src="${data.embed}" style="min-height: 630px; max-height: 1000px;" frameborder="0"></iframe>`;
            case "x.com":
                return `<iframe width="${data.width}" src="${data.embed}" style="min-height: 630px; max-height: 1000px;" frameborder="0"></iframe>`;
            case "instagram":
                return `<iframe width="${data.width}" src="${data.embed}" style="width: 100%; min-height: 630px; max-height: 1000px;" frameborder="0"></iframe>`;
            case "facebook":
                return `<iframe width="500" src="${data.embed}" style="min-height: 500px; max-height: 1000px;" frameborder="0"></iframe>`;
            case "youtube":
                return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            default:
                throw new Error("Only Youtube, Twitter, X.com, Instagram, Facebook Embeds are supported right now.");
        }
    },
};

export default transforms;
