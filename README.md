# TEMPLATE-NESTJS

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Experiences](#experiences)
- [Setting of the project](#setting)

## Experiences

- **Experience 0**: default template
- **Experience 1**: Using the gridFs for saving file and reading file in the database

## Setting

1. Create the project

```
$nest new <project-name>
```

2. Change few command in the package.json

3. Install mongoose

```
$npm install --save @nestjs/mongoose mongoose
```

Then import the module inside the *app.module.ts* with :

```
MongooseModule.forRoot('mongodb://<username>:<password>@<url>:<port>/<database>')
```

4. Adding environment file

```
$npm i --save @nestjs/config
```

Add the dependency in the import of the app.module

```
ConfigModule.forRoot({
  envFilePath: ['.env.local'],
  isGlobal: true
}),
```

Then create a *.env.local* file at the root of the project
