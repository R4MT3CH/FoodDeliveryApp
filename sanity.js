import sanityClient from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from '@sanity/client'

const client = createClient({
    projectId:"htmm9ylx",
    dataset:"production",
    useCdn: true,
    apiVersion: "2021-10-21"
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// RUN This to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000


export default client;