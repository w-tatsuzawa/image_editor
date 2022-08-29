FROM node:16
#ENV NODE_ENV production
RUN mkdir /image_editor
WORKDIR /image_editor
ADD . /image_editor
RUN npm install
CMD ["node", "./bin/www"]