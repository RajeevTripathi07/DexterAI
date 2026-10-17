# FROM node

# WORKDIR /app

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libcairo2-dev \
#     libpango1.0-dev \
#     libjpeg-dev \
#     libgif-dev \
#     librsvg2-dev \
#     && rm -rf /var/lib/apt/lists/*

# COPY package*.json ./
# RUN npm install

# COPY ./services/agent/package*.json ./services/agent/
# RUN npm install

# COPY ./services/agent ./services/agent/
# COPY ./shared ./shared/

# WORKDIR /app/services/agent

# EXPOSE 8003

# CMD ["npm", "start"]

FROM node:22-bookworm

WORKDIR /app

# Install system dependencies required for canvas and native graphics bindings
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY ./services/agent/package*.json ./services/agent/
WORKDIR /app/services/agent
RUN npm install

WORKDIR /app
COPY ./services/agent ./services/agent/
COPY ./shared ./shared/

WORKDIR /app/services/agent

EXPOSE 8003

CMD ["npm", "start"]