const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 720px)').matches) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}

const collections = {
  mens: {
    slug: 'mens-fashion',
    title: 'Men’s Fashion',
    intro: 'Browse outfit photo references. Contact the team to confirm whether a design can be made or is available, along with current options and prices.',
    image: 'assets/menswear/teal-formal-suit.jpg',
    designs: [
      {
        id: 'mens-teal-formal-suit',
        name: 'Teal formal suit',
        type: 'Formal style reference',
        image: 'assets/menswear/teal-formal-suit.jpg',
        description: 'A teal short-sleeve formal look shown as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-yellow-embroidered-boys-robe',
        name: 'Yellow embroidered boys’ robe',
        type: 'Traditional style reference',
        image: 'assets/menswear/yellow-embroidered-boys-robe.jpg',
        description: 'An embroidered robe reference for boys. Ask the team about age or size options and whether a similar style can be made.'
      },
      {
        id: 'mens-purple-traditional-set',
        name: 'Purple traditional set',
        type: 'Traditional style reference',
        image: 'assets/menswear/purple-traditional-set.jpg',
        description: 'A purple traditional outfit reference. Ask whether a similar style can be made or is currently available.'
      },
      {
        id: 'mens-light-blue-embroidered-set',
        name: 'Light-blue embroidered set',
        type: 'Traditional style reference',
        image: 'assets/menswear/light-blue-embroidered-set.jpg',
        description: 'A light-blue embroidered two-piece outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-lime-green-traditional-set',
        name: 'Lime-green traditional set',
        type: 'Traditional style reference',
        image: 'assets/menswear/lime-green-traditional-set.jpg',
        description: 'A lime-green coordinated outfit reference. Ask the team about similar designs and current options.'
      },
      {
        id: 'mens-green-tunic-set',
        name: 'Green tunic set',
        type: 'Traditional style reference',
        image: 'assets/menswear/green-tunic-set.jpg',
        description: 'A green tunic and trousers outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-deep-green-tunic-set',
        name: 'Deep-green tunic set',
        type: 'Traditional style reference',
        image: 'assets/menswear/deep-green-tunic-set.jpg',
        description: 'A deep-green tunic outfit reference with dark accents. Ask the team about similar styles and options.'
      },
      {
        id: 'mens-brown-embroidered-robe',
        name: 'Brown embroidered robe',
        type: 'Traditional style reference',
        image: 'assets/menswear/brown-embroidered-robe.jpg',
        description: 'A brown robe with embroidered detailing, shown as a style reference. Enquire about similar designs.'
      },
      {
        id: 'mens-purple-kaftan-set',
        name: 'Purple kaftan set',
        type: 'Traditional style reference',
        image: 'assets/menswear/purple-kaftan-set.jpg',
        description: 'A purple kaftan-style outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-burgundy-embroidered-robe',
        name: 'Burgundy embroidered robe',
        type: 'Traditional style reference',
        image: 'assets/menswear/burgundy-embroidered-robe.jpg',
        description: 'A burgundy robe with embroidered detailing, shown as a style reference. Ask the team about similar options.'
      },
      {
        id: 'mens-purple-traditional-outfit',
        name: 'Purple traditional outfit',
        type: 'Traditional style reference',
        image: 'assets/menswear/purple-traditional-outfit.jpg',
        description: 'A purple tunic and trousers outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-mint-green-tunic-set',
        name: 'Mint-green tunic set',
        type: 'Traditional style reference',
        image: 'assets/menswear/mint-green-tunic-set.jpg',
        description: 'A mint-green tunic and trousers outfit reference. Enquire about similar designs and available options.'
      },
      {
        id: 'mens-taupe-short-sleeve-set',
        name: 'Taupe short-sleeve set',
        type: 'Casual style reference',
        image: 'assets/menswear/taupe-short-sleeve-set.jpg',
        description: 'A taupe short-sleeve coordinated outfit reference. Ask whether a similar style can be made or is available.'
      },
      {
        id: 'mens-blue-short-sleeve-set',
        name: 'Blue short-sleeve set',
        type: 'Casual style reference',
        image: 'assets/menswear/blue-short-sleeve-set.jpg',
        description: 'A blue short-sleeve coordinated outfit reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-navy-embroidered-tunic',
        name: 'Navy embroidered tunic',
        type: 'Traditional style reference',
        image: 'assets/menswear/navy-embroidered-tunic.jpg',
        description: 'A navy tunic with gold-coloured embroidery, shown as a style reference. Ask about similar designs.'
      },
      {
        id: 'mens-blue-striped-long-sleeve-set',
        name: 'Blue striped long-sleeve set',
        type: 'Smart casual style reference',
        image: 'assets/menswear/blue-striped-long-sleeve-set.jpg',
        description: 'A blue long-sleeve coordinated outfit with contrasting stripe details. Ask whether a similar design is available.'
      },
      {
        id: 'mens-white-and-black-casual-set',
        name: 'White and black casual set',
        type: 'Casual style reference',
        image: 'assets/menswear/white-and-black-casual-set.jpg',
        description: 'A white casual outfit with black accents, shown as a style reference. Enquire about similar options.'
      },
      {
        id: 'mens-gold-embroidered-tunic',
        name: 'Gold embroidered tunic',
        type: 'Traditional style reference',
        image: 'assets/menswear/gold-embroidered-tunic.jpg',
        description: 'A gold-coloured tunic with embroidered detailing. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'mens-community-formal-style-one',
        name: 'Community formal style · 1',
        type: 'Customer photo reference',
        image: 'assets/menswear/blue-white-coordinated-set.jpg',
        description: 'A customer-provided community photo showing a formal outfit. Enquire about similar styles and options.'
      },
      {
        id: 'mens-community-formal-style-two',
        name: 'Community formal style · 2',
        type: 'Customer photo reference',
        image: 'assets/menswear/brown-cream-coordinated-set.jpg',
        description: 'A customer-provided community photo showing formal and casual outfits. Enquire about similar styles and options.'
      },
      {
        id: 'mens-style-reference-21',
        name: 'Men’s style reference 21',
        type: 'Style reference',
        image: 'assets/menswear/mens-style-21.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-22',
        name: 'Men’s style reference 22',
        type: 'Style reference',
        image: 'assets/menswear/yellow-embroidered-boys-robe.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-23',
        name: 'Men’s style reference 23',
        type: 'Style reference',
        image: 'assets/menswear/brown-embroidered-robe.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-24',
        name: 'Men’s style reference 24',
        type: 'Style reference',
        image: 'assets/menswear/white-navy-colorblock-walking-suit.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-25',
        name: 'Men’s style reference 25',
        type: 'Style reference',
        image: 'assets/menswear/purple-traditional-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-26',
        name: 'Men’s style reference 26',
        type: 'Style reference',
        image: 'assets/menswear/light-blue-embroidered-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-27',
        name: 'Men’s style reference 27',
        type: 'Style reference',
        image: 'assets/menswear/lime-green-traditional-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-28',
        name: 'Men’s style reference 28',
        type: 'Style reference',
        image: 'assets/menswear/green-tunic-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-29',
        name: 'Men’s style reference 29',
        type: 'Style reference',
        image: 'assets/menswear/deep-green-tunic-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-30',
        name: 'Men’s style reference 30',
        type: 'Style reference',
        image: 'assets/menswear/purple-kaftan-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-31',
        name: 'Men’s style reference 31',
        type: 'Style reference',
        image: 'assets/menswear/burgundy-embroidered-robe.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-32',
        name: 'Men’s style reference 32',
        type: 'Style reference',
        image: 'assets/menswear/purple-traditional-outfit.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-33',
        name: 'Men’s style reference 33',
        type: 'Style reference',
        image: 'assets/menswear/mint-green-tunic-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-34',
        name: 'Men’s style reference 34',
        type: 'Style reference',
        image: 'assets/menswear/taupe-short-sleeve-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-35',
        name: 'Men’s style reference 35',
        type: 'Style reference',
        image: 'assets/menswear/blue-short-sleeve-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-36',
        name: 'Men’s style reference 36',
        type: 'Style reference',
        image: 'assets/menswear/navy-embroidered-tunic.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-37',
        name: 'Men’s style reference 37',
        type: 'Style reference',
        image: 'assets/menswear/blue-striped-long-sleeve-set.jpg',
        description: 'A men’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-38',
        name: 'Gray short-sleeve outfit',
        type: 'Style reference',
        image: 'assets/menswear/white-and-black-casual-set.jpg',
        description: 'A gray short-sleeve outfit shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'mens-style-reference-39',
        name: 'Olive-and-white walking suit',
        type: 'Style reference',
        image: 'assets/menswear/olive-white-colorblock-walking-suit.jpg',
        description: 'An olive-and-white colorblock walking suit shared as a style reference. Enquire about similar styles and options.'
      },
      {
        id: 'mens-style-reference-40',
        name: 'Blue tunic set',
        type: 'Style reference',
        image: 'assets/menswear/blue-tunic-trouser-set.jpg',
        description: 'A blue tunic and trouser set shared as a style reference. Enquire about similar styles and options.'
      },
      {
        id: 'mens-style-reference-41',
        name: 'Navy formal jacket',
        type: 'Style reference',
        image: 'assets/menswear/navy-formal-jacket.jpg',
        description: 'A navy formal jacket and trouser outfit shared as a style reference. Enquire about similar styles and options.'
      }
    ]
  },
  womens: {
    slug: 'womens-fashion',
    title: 'Women’s Fashion',
    intro: 'Browse outfit photo references. Contact the team to confirm whether a design can be made or is available, along with current options and prices.',
    image: 'assets/womenswear/womens-style-02.jpg',
    designs: [
      {
        id: 'womens-printed-longline-kaftan',
        name: 'Printed longline kaftan',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-01.jpg',
        description: 'A patterned longline kaftan outfit shown as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-deep-green-embroidered-set',
        name: 'Deep-green embroidered set',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-02.jpg',
        description: 'A deep-green coordinated outfit with embroidered detailing. Enquire about similar designs and current options.'
      },
      {
        id: 'womens-african-stripe-poncho-coord',
        name: 'African stripe poncho co-ord',
        type: 'Smart casual style reference',
        image: 'assets/womenswear/womens-style-03.jpg',
        description: 'A colourful striped poncho and trouser look shown as a style reference. Ask whether a similar design can be made.'
      },
      {
        id: 'womens-ankara-bubu-gown',
        name: 'Ankara bubu gown',
        type: 'Ankara style reference',
        image: 'assets/womenswear/womens-style-04.jpg',
        description: 'A printed bubu gown reference shown from front and back. Enquire about similar styles and options.'
      },
      {
        id: 'womens-purple-asooke-gown',
        name: 'Purple aso-oke gown',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-05.jpg',
        description: 'A purple striped traditional gown reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-brown-embroidered-danshiki',
        name: 'Brown embroidered danshiki',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-06.jpg',
        description: 'A brown embroidered traditional outfit reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-classic-agbada',
        name: 'Classic female agbada',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-07.jpg',
        description: 'A classic agbada-inspired outfit reference. Ask the team whether a similar style can be made.'
      },
      {
        id: 'womens-style-reference-08',
        name: 'Women’s style reference 08',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-08.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-09',
        name: 'Women’s style reference 09',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-09.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-style-reference-10',
        name: 'Women’s style reference 10',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-10.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-11',
        name: 'Women’s style reference 11',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-11.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask the team about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-12',
        name: 'Women’s style reference 12',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-12.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-13',
        name: 'Women’s style reference 13',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-13.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-style-reference-14',
        name: 'Women’s style reference 14',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-14.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-15',
        name: 'Women’s style reference 15',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-15.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask the team about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-16',
        name: 'Women’s style reference 16',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-16.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-17',
        name: 'Women’s style reference 17',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-17.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-style-reference-18',
        name: 'Women’s style reference 18',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-18.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-19',
        name: 'Women’s style reference 19',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-19.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask the team about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-20',
        name: 'Women’s style reference 20',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-20.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-21',
        name: 'Women’s style reference 21',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-21.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-style-reference-22',
        name: 'Women’s style reference 22',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-22.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-style-reference-23',
        name: 'Women’s style reference 23',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-23.jpg',
        description: 'A women’s outfit photo shared as a style reference. Ask the team about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-24',
        name: 'Women’s style reference 24',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-24.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and options.'
      },
      {
        id: 'womens-ankara-design-trio',
        name: 'Ankara design trio',
        type: 'Ankara style reference',
        image: 'assets/womenswear/womens-style-25.jpg',
        description: 'A photo featuring several Ankara design references. Ask the team about similar designs and available options.'
      },
      {
        id: 'womens-asooke-adire-fusion-bubu',
        name: 'Aso-oke and Adire fusion bubu',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-26.jpg',
        description: 'A bubu-style outfit combining aso-oke and Adire-inspired details. Enquire about similar designs.'
      },
      {
        id: 'womens-black-and-white-adire-bubu',
        name: 'Black and white Adire bubu',
        type: 'Adire style reference',
        image: 'assets/womenswear/womens-style-27.jpg',
        description: 'A black and white Adire bubu outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-white-embroidered-ensemble',
        name: 'White embroidered ensemble',
        type: 'Occasion style reference',
        image: 'assets/womenswear/womens-style-28.jpg',
        description: 'A white outfit with contrasting embroidered details, shown as a style reference. Enquire about similar options.'
      },
      {
        id: 'womens-golden-embroidered-robe',
        name: 'Golden embroidered robe',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-29.jpg',
        description: 'A golden robe with embroidered detailing, shown as a style reference. Ask about similar designs and options.'
      },
      {
        id: 'womens-royal-blue-embroidered-robe',
        name: 'Royal-blue embroidered robe',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-30.jpg',
        description: 'A royal-blue robe with geometric embroidered details. Enquire about similar designs and options.'
      },
      {
        id: 'womens-family-embroidered-outfits',
        name: 'Coordinated embroidered outfits',
        type: 'Family style reference',
        image: 'assets/womenswear/womens-style-31.jpg',
        description: 'A coordinated family outfit photo shared as a style reference. Ask the team about similar designs.'
      },
      {
        id: 'womens-style-reference-32',
        name: 'Women’s style reference 32',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-32.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'womens-brown-embroidered-two-piece',
        name: 'Brown embroidered two-piece',
        type: 'Traditional style reference',
        image: 'assets/womenswear/womens-style-33.jpg',
        description: 'A brown embroidered tunic and trouser outfit reference. Ask whether a similar design can be made or is available.'
      },
      {
        id: 'womens-style-reference-34',
        name: 'Women’s style reference 34',
        type: 'Style reference',
        image: 'assets/womenswear/womens-style-34.jpg',
        description: 'A women’s outfit photo shared as a style reference. Enquire about similar designs and current options.'
      },
      {
        id: 'womens-style-reference-35',
        name: 'White lace bubu gown',
        type: 'Style reference',
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Comfortable%20V-neck%20Contrast%20Short%20Sleeve%20Loose%20Maxi%20Dress-HGy6e6FM2gK6MHNKCcquRxMonwYjuL.jpg',
        description: 'A white lace bubu gown style reference. Enquire about similar designs and current options.'
      }
    ]
  },
  tailoring: {
    slug: 'custom-tailoring',
    title: 'Custom Tailoring',
    intro: 'Have a garment in mind? Enquire about custom tailoring and confirm available options directly with the team.',
    image: 'assets/womenswear/womens-style-03.jpg',
    designs: [
      {
        id: 'tailoring-mens-teal-suit-reference',
        name: 'Teal formal outfit reference',
        type: 'Men’s tailoring inspiration',
        image: 'assets/menswear/teal-formal-suit.jpg',
        service: 'mens',
        description: 'A teal formal outfit photo from the men’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'tailoring-mens-purple-set-reference',
        name: 'Purple traditional outfit reference',
        type: 'Men’s tailoring inspiration',
        image: 'assets/menswear/purple-traditional-set.jpg',
        service: 'mens',
        description: 'A purple traditional outfit photo from the men’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'tailoring-mens-light-blue-set-reference',
        name: 'Light-blue embroidered outfit reference',
        type: 'Men’s tailoring inspiration',
        image: 'assets/menswear/light-blue-embroidered-set.jpg',
        service: 'mens',
        description: 'A light-blue embroidered outfit photo from the men’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'tailoring-womens-printed-kaftan-reference',
        name: 'Printed kaftan outfit reference',
        type: 'Women’s tailoring inspiration',
        image: 'assets/womenswear/womens-style-01.jpg',
        service: 'womens',
        description: 'A printed kaftan photo from the women’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'tailoring-womens-ankara-gown-reference',
        name: 'Ankara gown reference',
        type: 'Women’s tailoring inspiration',
        image: 'assets/womenswear/womens-style-04.jpg',
        service: 'womens',
        description: 'A printed gown photo from the women’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'tailoring-womens-traditional-gown-reference',
        name: 'Purple traditional gown reference',
        type: 'Women’s tailoring inspiration',
        image: 'assets/womenswear/womens-style-05.jpg',
        service: 'womens',
        description: 'A purple traditional gown photo from the women’s collection, shown as tailoring inspiration only. Ask whether a similar design can be made and confirm the fabric, measurements, timing, and quotation.'
      },
      {
        id: 'custom-tailoring-enquiry',
        name: 'Custom tailoring enquiry',
        type: 'Custom design enquiry',
        image: 'assets/womenswear/womens-style-03.jpg',
        description: 'Share the garment you have in mind. The team can confirm whether your requested design is possible and discuss measurements, fabric choices, timing, and price.'
      }
    ],
    isTailoring: true
  }
};

const collectionBySlug = Object.fromEntries(
  Object.entries(collections).map(([key, collection]) => [collection.slug, key])
);
const browser = document.querySelector('#collection-browser');
const detailPanel = document.querySelector('#product-detail');
const fallbackPanel = document.querySelector('#route-fallback');
const collectionGrid = document.querySelector('#catalogue-grid');
const collectionTitle = document.querySelector('#catalogue-title');
const collectionIntro = document.querySelector('#catalogue-intro');
const collectionsSection = document.querySelector('#collections');
const detailImage = document.querySelector('#detail-image');
const detailTitle = document.querySelector('#detail-title');
const detailReference = document.querySelector('#detail-reference');
const detailDescription = document.querySelector('#detail-description');
const detailPrice = document.querySelector('#detail-price');
const detailBackLink = document.querySelector('#detail-back-link');
const detailOrderPrimary = document.querySelector('#detail-order-primary');
const detailOrderSecondary = document.querySelector('#detail-order-secondary');
const fallbackTitle = document.querySelector('#fallback-title');
const fallbackMessage = document.querySelector('#fallback-message');
const tailoringSection = document.querySelector('#tailoring');
const tailoringTitle = document.querySelector('#tailoring-title');
const tailoringHeroImage = document.querySelector('.tailoring-hero-image img');
const tailoringGallery = document.querySelector('#tailoring-gallery-grid');
const tailoringGalleryReset = document.querySelector('#tailoring-gallery-reset');
const tailoringWhatsAppPrimary = document.querySelector('#tailoring-whatsapp-primary');
const tailoringWhatsAppSecondary = document.querySelector('#tailoring-whatsapp-secondary');
const whatsappNumbers = ['23278538615', '23232110632'];

function makeWhatsAppLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function showRouteView(view = 'collection') {
  document.body.classList.add('is-route-view');
  document.body.classList.toggle('is-tailoring-view', view === 'tailoring');
  browser.hidden = true;
  detailPanel.hidden = true;
  fallbackPanel.hidden = true;
  tailoringSection.hidden = view !== 'tailoring';
}

function focusRouteDestination(heading, container, scroll) {
  heading.focus({ preventScroll: true });
  container.scrollIntoView({ behavior: scroll ? 'smooth' : 'auto', block: 'start' });
}

function openCollection(key, scroll = true) {
  const collection = collections[key];
  if (!collection) return;
  if (collection.isTailoring) {
    openTailoringHub(scroll);
    return;
  }

  collectionTitle.textContent = collection.title;
  collectionIntro.textContent = collection.intro;
  collectionGrid.replaceChildren();

  collection.designs.forEach((design) => {
    const card = document.createElement('article');
    card.className = 'catalogue-card';

    const imageLink = document.createElement('a');
    imageLink.className = 'catalogue-image-button';
    imageLink.href = `#/products/${design.id}`;
    imageLink.setAttribute('aria-label', `View details for ${design.name}`);

    const image = document.createElement('img');
    image.src = design.image || collection.image;
    image.alt = `Photo reference for ${design.name}`;
    image.width = 480;
    image.height = 540;
    image.loading = 'lazy';
    image.decoding = 'async';
    imageLink.append(image);

    const copy = document.createElement('div');
    copy.className = 'catalogue-card-copy';

    const kicker = document.createElement('p');
    kicker.className = 'product-kicker';
    kicker.textContent = design.type;

    const title = document.createElement('h3');
    title.textContent = design.name;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = 'Price on enquiry';

    const viewLink = document.createElement('a');
    viewLink.className = 'view-design-link';
    viewLink.href = `#/products/${design.id}`;
    viewLink.textContent = 'View Details →';

    copy.append(kicker, title, price, viewLink);
    card.append(imageLink, copy);
    collectionGrid.append(card);
  });

  showRouteView();
  browser.hidden = false;
  focusRouteDestination(collectionTitle, browser, scroll);
}

function renderTailoringGallery(filter = 'all') {
  tailoringGallery.replaceChildren();
  collections.tailoring.designs
    .filter((design) => design.service && (filter === 'all' || design.service === filter))
    .forEach((design) => {
      const card = document.createElement('article');
      card.className = 'tailoring-gallery-card';

      const imageLink = document.createElement('a');
      imageLink.className = 'tailoring-gallery-image';
      imageLink.href = `#/products/${design.id}`;
      imageLink.setAttribute('aria-label', `View tailoring inspiration details for ${design.name}`);

      const image = document.createElement('img');
      image.src = design.image;
      image.alt = `Style reference for ${design.name}`;
      image.width = 480;
      image.height = 545;
      image.loading = 'lazy';
      image.decoding = 'async';
      imageLink.append(image);

      const copy = document.createElement('div');
      copy.className = 'tailoring-gallery-copy';
      const label = document.createElement('p');
      label.className = 'product-kicker';
      label.textContent = design.type;
      const title = document.createElement('h3');
      title.textContent = design.name;
      const viewLink = document.createElement('a');
      viewLink.className = 'view-design-link';
      viewLink.href = `#/products/${design.id}`;
      viewLink.textContent = 'View details →';
      copy.append(label, title, viewLink);
      card.append(imageLink, copy);
      tailoringGallery.append(card);
    });
  tailoringGalleryReset.hidden = filter === 'all';
}

function openTailoringHub(scroll = true) {
  showRouteView('tailoring');
  if (!tailoringHeroImage.hasAttribute('src')) {
    tailoringHeroImage.src = tailoringHeroImage.dataset.src;
  }
  renderTailoringGallery();
  focusRouteDestination(tailoringTitle, tailoringSection, scroll);
}

function scrollToTailoringSection(id) {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openProduct(key, design, scroll = true) {
  const collection = collections[key];
  detailImage.src = design.image || collection.image;
  detailImage.alt = `Photo reference for ${design.name}`;
  document.querySelector('#detail-kicker').textContent = `${collection.title} · ${design.type}`;
  detailTitle.textContent = design.name;
  detailReference.textContent = `Reference: ${design.id}`;
  detailDescription.textContent = collection.isTailoring
    ? design.description
    : `${design.description} Ask us to confirm current price, sizes, colours, and fabric options.`;
  detailPrice.textContent = 'Price and options: please enquire.';
  detailBackLink.href = `#/collections/${collection.slug}`;

  const message = collection.isTailoring && design.id === 'custom-tailoring-enquiry'
    ? 'Hello Salone Stitch House, I am interested in your custom tailoring services. Please let me know the available options, prices, and how I can arrange measurements.'
    : collection.isTailoring
    ? `Hello Salone Stitch House, I am interested in the ${design.name}, reference ${design.id}, as inspiration for a custom-tailored design. Please let me know whether a similar design is possible and confirm fabric options, measurements, timing, and price.`
    : `Hello Salone Stitch House, I am interested in the ${design.name}, reference ${design.id}. Please confirm the current price, available sizes, colours, and ordering arrangements.`;

  detailOrderPrimary.href = makeWhatsAppLink(whatsappNumbers[0], message);
  detailOrderSecondary.href = makeWhatsAppLink(whatsappNumbers[1], message);

  showRouteView();
  detailPanel.hidden = false;
  focusRouteDestination(detailTitle, detailPanel, scroll);
}

function showFallback(title, message, scroll = true) {
  showRouteView();
  fallbackTitle.textContent = title;
  fallbackMessage.textContent = message;
  fallbackPanel.hidden = false;
  focusRouteDestination(fallbackTitle, fallbackPanel, scroll);
}

function renderRoute(scroll = true) {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) {
    document.body.classList.remove('is-route-view');
    document.body.classList.remove('is-tailoring-view');
    browser.hidden = true;
    detailPanel.hidden = true;
    fallbackPanel.hidden = true;
    tailoringSection.hidden = true;
    return;
  }

  const [section, identifier, extra] = hash.slice(2).split('/');
  if (extra || !section || !identifier) {
    showFallback('Page not found', 'That collection or design link is not valid. Return home to browse the available sections.', scroll);
    return;
  }

  if (section === 'collections') {
    const key = collectionBySlug[identifier];
    if (key) {
      openCollection(key, scroll);
    } else {
      showFallback('Collection not found', 'We could not find that collection. Return home to browse men’s fashion, women’s fashion, and custom tailoring.', scroll);
    }
    return;
  }

  if (section === 'products') {
    const match = Object.entries(collections).flatMap(([key, collection]) =>
      collection.designs
        .filter((design) => design.id === identifier)
        .map((design) => ({ key, design }))
    )[0];

    if (match) {
      openProduct(match.key, match.design, scroll);
    } else {
      showFallback('Design not found', 'We could not find that design. Return home to browse the collections and choose another design.', scroll);
    }
    return;
  }

  showFallback('Page not found', 'That page could not be found. Return home to explore the collections.', scroll);
}

document.addEventListener('click', (event) => {
  if (event.target.closest('a[href^="#/"]')) {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-tailoring-filter]');
  if (filterButton) {
    const filter = filterButton.getAttribute('data-tailoring-filter');
    document.querySelectorAll('[data-tailoring-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button === filterButton));
    });
    renderTailoringGallery(filter);
    tailoringGallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const scrollButton = event.target.closest('[data-tailoring-scroll]');
  if (scrollButton) {
    scrollToTailoringSection(scrollButton.getAttribute('data-tailoring-scroll'));
    return;
  }

  if (event.target.closest('#tailoring-gallery-reset')) {
    document.querySelectorAll('[data-tailoring-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
    });
    renderTailoringGallery();
  }
});

const customTailoringMessage = 'Hello Salone Stitch House, I would like to enquire about a custom-tailored outfit. I can share my preferred design, style or colour, occasion, fabric preference, and preferred completion date. Please let me know whether it is possible, the estimated price, how measurements can be arranged, and the next steps.';
tailoringWhatsAppPrimary.href = makeWhatsAppLink(whatsappNumbers[0], customTailoringMessage);
tailoringWhatsAppSecondary.href = makeWhatsAppLink(whatsappNumbers[1], customTailoringMessage);

window.addEventListener('hashchange', () => renderRoute());
renderRoute(false);

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
