
import "dotenv/config";

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Role } from "@/app/types";
import { hashPassword } from "@/app/lib/auth";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter })
}
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


async function main() {
    console.log("Starting database seed")
    // Create Teams
    const teams = await Promise.all([
        prisma.team.create({
            data: {
                name: "Engineering",
                description: "Software engineering and platform development",
                code: "ENG-2018",
            },
        }),
        prisma.team.create({
            data: {
                name: "Human Resources",
                description: "Employee relations and recruitment",
                code: "HR-2019",
            },
        }),
        prisma.team.create({
            data: {
                name: "Finance",
                description: "Financial planning and accounting",
                code: "FIN-2020",
            },
        }),
        prisma.team.create({
            data: {
                name: "Marketing",
                description: "Branding and marketing campaigns",
                code: "MKT-2021",
            },
        }),
        prisma.team.create({
            data: {
                name: "Sales",
                description: "Client acquisition and sales operations",
                code: "SAL-2022",
            },
        }),
        prisma.team.create({
            data: {
                name: "Customer Support",
                description: "Customer issue resolution and support",
                code: "SUP-2023",
            },
        }),
        prisma.team.create({
            data: {
                name: "Product Management",
                description: "Product strategy and roadmap planning",
                code: "PRD-2024",
            },
        }),
        prisma.team.create({
            data: {
                name: "Design",
                description: "UI/UX and product design",
                code: "DSN-2025",
            },
        }),
        prisma.team.create({
            data: {
                name: "DevOps",
                description: "Infrastructure and deployment automation",
                code: "DOP-2026",
            },
        }),
        prisma.team.create({
            data: {
                name: "Security",
                description: "Application and infrastructure security",
                code: "SEC-2027",
            },
        }),
        prisma.team.create({
            data: {
                name: "QA Testing",
                description: "Quality assurance and testing",
                code: "QAT-2028",
            },
        }),
        prisma.team.create({
            data: {
                name: "Data Science",
                description: "Data analysis and machine learning",
                code: "DAT-2029",
            },
        }),
        prisma.team.create({
            data: {
                name: "Research",
                description: "Innovation and technical research",
                code: "RND-2030",
            },
        }),
        prisma.team.create({
            data: {
                name: "Operations",
                description: "Business operations and workflow management",
                code: "OPS-2031",
            },
        }),
        prisma.team.create({
            data: {
                name: "Legal",
                description: "Legal compliance and contracts",
                code: "LEG-2032",
            },
        }),
        prisma.team.create({
            data: {
                name: "Administration",
                description: "Administrative and office management",
                code: "ADM-2033",
            },
        }),
        prisma.team.create({
            data: {
                name: "Procurement",
                description: "Purchasing and vendor management",
                code: "PRC-2034",
            },
        }),
        prisma.team.create({
            data: {
                name: "Business Intelligence",
                description: "Reporting and analytics",
                code: "BIZ-2035",
            },
        }),
        prisma.team.create({
            data: {
                name: "Mobile Development",
                description: "Android and iOS application development",
                code: "MOB-2036",
            },
        }),
        prisma.team.create({
            data: {
                name: "Cloud Engineering",
                description: "Cloud infrastructure and services",
                code: "CLD-2037",
            },
        }),
        prisma.team.create({
            data: {
                name: "AI Research",
                description: "Artificial intelligence solutions",
                code: "AIR-2038",
            },
        }),
        prisma.team.create({
            data: {
                name: "Content",
                description: "Content creation and publishing",
                code: "CNT-2039",
            },
        }),
        prisma.team.create({
            data: {
                name: "Social Media",
                description: "Social media campaigns and engagement",
                code: "SOC-2040",
            },
        }),
        prisma.team.create({
            data: {
                name: "Training",
                description: "Employee learning and development",
                code: "TRN-2041",
            },
        }),
        prisma.team.create({
            data: {
                name: "Analytics",
                description: "Business and performance analytics",
                code: "ANL-2042",
            },
        }),
        prisma.team.create({
            data: {
                name: "Architecture",
                description: "System architecture and design",
                code: "ARC-2043",
            },
        }),
        prisma.team.create({
            data: {
                name: "Technical Support",
                description: "Technical troubleshooting and maintenance",
                code: "TEC-2044",
            },
        }),
        prisma.team.create({
            data: {
                name: "Compliance",
                description: "Regulatory and compliance management",
                code: "CMP-2045",
            },
        }),
        prisma.team.create({
            data: {
                name: "Strategy",
                description: "Corporate strategy and planning",
                code: "STG-2046",
            },
        }),
        prisma.team.create({
            data: {
                name: "Innovation Lab",
                description: "Experimental product initiatives",
                code: "INN-2047",
            },
        }),
    ]);
    // create users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: "Arjun Sharma",
                email: "arjun.sharma@example.com",
                password: await hashPassword("password"),
                role: Role.ADMIN,
                team: {
                    connect: {
                        id: teams[0].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Priya Verma",
                email: "priya.verma@example.com",
                password: await hashPassword("password"),
                role: Role.MANAGER,
                team: {
                    connect: {
                        id: teams[1].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Rahul Mehta",
                email: "rahul.mehta@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[2].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Sneha Kapoor",
                email: "sneha.kapoor@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[3].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Vikram Singh",
                email: "vikram.singh@example.com",
                password: await hashPassword("password"),
                role: Role.MANAGER,
                team: {
                    connect: {
                        id: teams[4].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Ananya Patel",
                email: "ananya.patel@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[5].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Rohan Desai",
                email: "rohan.desai@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[6].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Kavya Nair",
                email: "kavya.nair@example.com",
                password: await hashPassword("password"),
                role: Role.GUEST,
                team: {
                    connect: {
                        id: teams[7].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Aditya Joshi",
                email: "aditya.joshi@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[8].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Neha Iyer",
                email: "neha.iyer@example.com",
                password: await hashPassword("password"),
                role: Role.ADMIN,
                team: {
                    connect: {
                        id: teams[9].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Amit Kulkarni",
                email: "amit.kulkarni@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[10].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Pooja Reddy",
                email: "pooja.reddy@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[11].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Karan Malhotra",
                email: "karan.malhotra@example.com",
                password: await hashPassword("password"),
                role: Role.MANAGER,
                team: {
                    connect: {
                        id: teams[12].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Isha Chawla",
                email: "isha.chawla@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[13].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Manish Gupta",
                email: "manish.gupta@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[14].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Simran Kaur",
                email: "simran.kaur@example.com",
                password: await hashPassword("password"),
                role: Role.GUEST,
                team: {
                    connect: {
                        id: teams[15].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Dev Patel",
                email: "dev.patel@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[16].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Meera Shah",
                email: "meera.shah@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[17].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Yash Agarwal",
                email: "yash.agarwal@example.com",
                password: await hashPassword("password"),
                role: Role.MANAGER,
                team: {
                    connect: {
                        id: teams[18].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Tanvi Mishra",
                email: "tanvi.mishra@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[19].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Nikhil Rao",
                email: "nikhil.rao@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[20].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Ayesha Khan",
                email: "ayesha.khan@example.com",
                password: await hashPassword("password"),
                role: Role.ADMIN,
                team: {
                    connect: {
                        id: teams[21].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Siddharth Jain",
                email: "siddharth.jain@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[22].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Ritika Sen",
                email: "ritika.sen@example.com",
                password: await hashPassword("password"),
                role: Role.GUEST,
                team: {
                    connect: {
                        id: teams[23].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Harsh Vardhan",
                email: "harsh.vardhan@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[24].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Diya Menon",
                email: "diya.menon@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[25].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Farhan Ali",
                email: "farhan.ali@example.com",
                password: await hashPassword("password"),
                role: Role.MANAGER,
                team: {
                    connect: {
                        id: teams[26].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Riya Bose",
                email: "riya.bose@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[27].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Kabir Anand",
                email: "kabir.anand@example.com",
                password: await hashPassword("password"),
                role: Role.GUEST,
                team: {
                    connect: {
                        id: teams[28].id,
                    },
                },
            },
        }),

        prisma.user.create({
            data: {
                name: "Zara Sheikh",
                email: "zara.sheikh@example.com",
                password: await hashPassword("password"),
                role: Role.USER,
                team: {
                    connect: {
                        id: teams[29].id,
                    },
                },
            },
        }),
    ]);

    console.log("database seeded successfully")
}

main().then(() => {

}).catch((error) => {
    console.log("Seeding failed");
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect()
})