FROM node:lts-alpine
ENV    NODE_ENV=production
# ENV    MYSQL_USERNAME=fcode-member-card
# ENV    MYSQL_DATABASE=fcode_member_card
# ENV    GOOGLE_CLIENT_ID=379611883013-5phhig5lpmoltrb238njk7lds3e0h1jh.apps.googleusercontent.com
# ENV    MYSQL_PASSWORD=f-code.tech
# ENV    GOOGLE_CLIENT_SECRET=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
# ENV    HOST_URL="http://localhost:3000"
# ENV    PORT=3000
# ENV    JWT_SECRET=f-code.tech
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "devStart"]
