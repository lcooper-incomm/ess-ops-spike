FROM ubuntu:18.04
USER root

ENV GITHUB_OWNER "InComm-Software-Development"
ENV RUNNER_WORKDIR "dev_work"
ENV RUNNER_LABELS "github actions runner"
RUN apt-get update \
    && apt-get install -y \
        curl \
        sudo \
        git \
        jq \
        iputils-ping \
        apt-transport-https \
        ca-certificates \
        gnupg-agent \
        software-properties-common \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m github \
    && usermod -aG sudo github \
    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

VOLUME /var/lib/docker
USER github
WORKDIR /home/github
COPY --chown=github:github entrypoint.sh ./entrypoint.sh
RUN sudo chmod u+x ./entrypoint.sh
ENTRYPOINT ["/home/github/entrypoint.sh"]
