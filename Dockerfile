FROM node:18.20.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MODEL_URL=https://storage.googleapis.com/cc-capstone/ml/model.json
ENV GCLOUD_STORAGE_BUCKET=ml_picture
ENV DB_USER=rootcapstone
ENV DB_PASSWORD=123
ENV DB_NAME=capstone
ENV INSTANCE_CONNECTION_NAME=capstone-426010:asia-southeast2:capstone
ENV DB_HOST=34.101.40.17
ENV PORT=3000



CMD ["npm", "start"]

