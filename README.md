# ApexHaux_Api
ApexHauz is a platform where people can create and/or search properties for sale or rent

## Features

1. User can sign up
2. User can sign in
3. User can create a property advert
4. User can update property advert
5. User can mark a property as sold
6. User can delete a property advert
7. User can get a specific property by ID
8. User can get all properties
9. User can get all properties with a specific type

## API endpoints

1. `POST /auth/signup`: Creates a new user
2. `POST /auth/signin`: Logs in a user
3. `POST /property`: Create a property advert
4. `PATCH /property/<:property-id>`: Update property data
5. `PATCH /property/<:property-id>/sold`: Mark a property as sold
6. `DELETE /property/<:property-id>`: Delete a property advert
7. `GET /property/<:property-id>`: Get a specific property by ID
8. `GET /property`: Get all properties
9. `GET /property/search?type=propertyType`: Get all properties with a specific type

## Tools

* NodeJS/Express: Server
* MySQL: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* uniqid: Generate random id
