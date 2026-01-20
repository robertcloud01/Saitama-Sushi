import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const categories = [
        {
            name: 'Sushi',
            slug: 'sushi',
            order: 1,
            products: [
                {
                    name: 'Salmon Nigiri',
                    slug: 'salmon-nigiri',
                    description: 'Fresh Atlantic salmon on seasoned rice.',
                    price: 900,
                    image: '/images/sushi-salmon.jpg',
                    isPopular: true,
                },
                {
                    name: 'Tuna Sashimi',
                    slug: 'tuna-sashimi',
                    description: 'Premium tuna slices.',
                    price: 1200,
                    image: '/images/sashimi-tuna.jpg',
                },
            ],
        },
        {
            name: 'Rolls',
            slug: 'rolls',
            order: 2,
            products: [
                {
                    name: 'California Roll',
                    slug: 'california-roll',
                    description: 'Crab, avocado, and cucumber.',
                    price: 850,
                    image: '/images/california-roll.jpg',
                    isPopular: true,
                },
                {
                    name: 'Dragon Roll',
                    slug: 'dragon-roll',
                    description: 'Eel and cucumber topped with avocado.',
                    price: 1400,
                    image: '/images/dragon-roll.jpg',
                },
            ],
        },
        {
            name: 'Combos',
            slug: 'combos',
            order: 3,
            products: [
                {
                    name: 'Saitama Special',
                    slug: 'saitama-special',
                    description: 'Chef\'s selection of 12 pieces.',
                    price: 4500,
                    image: '/images/combo-special.jpg',
                    isNew: true,
                },
            ],
        },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: {
                name: cat.name,
                slug: cat.slug,
                order: cat.order,
                products: {
                    create: cat.products,
                },
            },
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
