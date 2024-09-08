# Pulling the rust image as the build environment
FROM rust:latest AS build

# Installing necessary dependencies
RUN apt-get update && apt-get install -y \
    libwebkit2gtk-4.0-dev \
    libgtk-3-dev \
    curl \
    libssl-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Installing Node.js, for Tauri frontend
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Setup the working dir inside the container
WORKDIR /app

# Copy Cargo.toml and Cargo.lock to the container
COPY ./Cargo.toml ./Cargo.lock ./

# Build the Rust dependencies and cache them
RUN cargo fetch --locked

# Build the frontend
RUN pnpm install
RUN pnpm run build

# Build the Tauri app
RUN cargo build --release

# Create a final image that contains the built binaries
FROM debian:bullseye-slim AS runtime

# Install necessary runtime dependencies for the Tauri app
RUN apt-get update && apt-get install -y \
    libwebkit2gtk-4.0-37 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working dir for the runtime container
WORKDIR /app

# Copy the built binary from the previous build stage
COPY --from=build /app/target/release/anvel /app/anvel

# Set up entry point
CMD ["/app/anvel"]
