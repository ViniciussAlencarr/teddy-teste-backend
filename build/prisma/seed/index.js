"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@libs/prisma");
const main = async () => {
    await prisma_1.prisma.user.create({
        data: {
            email: 'joe.doe@gmail.com',
            password: 'secret',
            name: 'Joe Doe'
        }
    });
};
main();
