// Writes prashant-kumar.vcf: the contact a phone saves from "Save contact".
// vCard 3.0 with the photo inline. Run after changing any contact detail:
//   node scripts/build-vcard.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const contact = {
  first: 'Prashant',
  last: 'Kumar',
  title: 'Founding Product Lead',
  org: 'Crafting Tomorrow',
  email: 'pkumar13@mit.edu',
  // phone: '+16177126527',
  website: 'https://www.pkumarpmleader.com/',
  linkedin: 'https://www.linkedin.com/in/pkumarpmleader/',
  city: 'Cambridge',
  region: 'MA',
  country: 'United States',
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const photo = readFileSync(join(root, 'assets/prashant-kumar-contact.jpg')).toString('base64')

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${esc(contact.last)};${esc(contact.first)};;;`,
  `FN:${esc(`${contact.first} ${contact.last}`)}`,
  `ORG:${esc(contact.org)}`,
  `TITLE:${esc(contact.title)}`,
  `item1.EMAIL;TYPE=INTERNET,PREF:${esc(contact.email)}`,
  'item1.X-ABLabel:Email',
  contact.phone ? `TEL;TYPE=CELL,VOICE:${esc(contact.phone)}` : null,
  `item2.URL:${esc(contact.website)}`,
  'item2.X-ABLabel:Website',
  `item3.URL:${esc(contact.linkedin)}`,
  'item3.X-ABLabel:LinkedIn',
  `ADR;TYPE=WORK:;;;${esc(contact.city)};${esc(contact.region)};;${esc(contact.country)}`,
  // folded at 75 octets, continued with a space, as vCard 3.0 asks
  `PHOTO;ENCODING=b;TYPE=JPEG:${photo}`.match(/.{1,74}/g).join('\r\n '),
  'END:VCARD',
].filter(Boolean)

writeFileSync(join(root, 'prashant-kumar.vcf'), `${lines.join('\r\n')}\r\n`)
console.log('wrote prashant-kumar.vcf')
