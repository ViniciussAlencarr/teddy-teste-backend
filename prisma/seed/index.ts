import { prisma } from '../../src/lib/prisma';

const main = async () => {
    await prisma.user.create({
        data: {
            email: 'joe.doe@gmail.com',
            password: 'secret',
            name: 'Joe Doe'
        }
    })
}

main()