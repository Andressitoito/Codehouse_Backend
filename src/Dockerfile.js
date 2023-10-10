FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

# docker build -t dockeroperationsAndy .

docker login => log in from ternial in docker hub

docker tag usercreator <username>/usercreator:1.0.0

docker push <username>/usercreator:1.0.0

kubectl version

minikube start

kubectl apply -f kubeusers.yaml

kubectl get deplayments

kubectl get pods

kubectl get services

minikube service list

minikube service kubeservice39770