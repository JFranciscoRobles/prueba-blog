Blog Project Overview
=====================

https://prueba-blog.vercel.app/

You can use the following credentials:
Email: admin@admin.com
Password: admin

Alternatively, you can create a new user.

This project serves as a technical test for a blog application and incorporates the following technologies:

-   Prisma ORM: A modern database toolkit for TypeScript and Node.js.
-   PlanetScale (MySQL Database): Provides a scalable and reliable MySQL database.
-   Next.js: A React framework for building web applications.

Project Setup
-------------

Before initiating the project, you need to set up four environment variables:

`DATABASE_URL='DB URL STRING'`

``NEXTAUTH_SECRET="HASH"``

`NEXTAUTH_JWT_SECRET="HASH"`

`NEXT_PUBLIC_URL="API URL (Usually where the Frontend is hosted)"`

To initialize the project, follow these steps:

1.  Add the `DATABASE_URL` variable.

2.  Run the following Prisma commands:


   `npx prisma generate   # To create models`

   `npx prisma db push    # To create models in the database`

Features
--------

-   User Authentication: Each user is an author with the ability to create posts.
-   Dashboard Panel: Authors can create and manage posts through an dashboard panel.
-   Public Access: Posts are visible without the need for user authentication.
-   Server-side Pagination: The system incorporates server-side pagination for improved performance.
-   Text-based Search: Users can perform text-based searches on the server.
-   Post Management: Authors can publish, unpublish, and modify posts.
-   Validation: Both frontend and backend include validations.
-   Single User Restrictions:
    -   Only users can create posts.
    -   Only users can modify their own posts.
    -   Only users can unpublish their own posts.

Implementation Details
----------------------

Despite utilizing Prisma ORM, a decision has been made to decouple the frontend from the ORM. The frontend makes Fetch calls to the API routes, and the API, in turn, connects to the ORM. This architectural choice provides flexibility and separation of concerns.

Feel free to explore and enhance this blog project.


This application could have more improvements, such as:
-------------------------------------------------------

-  Enhancements in SEO.
-  Conversion into a Progressive Web App (PWA) for offline bookmarks.
-  Improvement in the results of validations.
-  Enhanced intuitiveness.
