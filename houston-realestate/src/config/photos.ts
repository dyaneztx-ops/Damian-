/**
 * SITE PHOTOS
 * Free stock photos from Unsplash (https://unsplash.com/license): free for
 * commercial use, no attribution required. They are generic "nice house"
 * photos used for atmosphere, NOT listings and NOT the specific neighborhoods.
 *
 * To use your own photo instead, drop it in /public/images/ and replace the
 * URL with its path, e.g. "/images/katy.jpg".
 * If a remote photo ever fails to load, the site shows the local placeholder.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const photos = {
  homeHero: u("1600596542815-ffad4c1539a9"),
  pageHero: u("1512917774080-9991f1c4c750"),
  buyHero: u("1580587771525-78b9dba3b914"),
  sellHero: u("1600607687939-ce8a6c25118c"),
  investHero: u("1613490493576-7fde63acd811"),
  leaseHero: u("1568605114967-8130f3a36994"),
};

export const unsplash = u;
