package com.incomm.cca.model.domain;

import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.JobStatus;
import com.incomm.minion.model.scheduler.Owner;
import com.incomm.minion.model.scheduler.Task;

import java.util.Set;

public class MinionJobBuilder {

    private String name;
    private String comment;
    private Owner owner;
    private Set<Task> tasks;
    private Set<JobStatus> jobStatuses;
    private String ipAddress;

    public Job build() {
        Job job = new Job();
        job.setName(this.name);
        job.setComment(this.comment);
        job.setOwner(this.owner);
        job.setTasks(this.tasks);
        job.setJobStatuses(this.jobStatuses);
        job.setIpAddress(this.ipAddress);
        return job;
    }

    public MinionJobBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public MinionJobBuilder setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public MinionJobBuilder setOwner(Owner owner) {
        this.owner = owner;
        return this;
    }

    public MinionJobBuilder setTasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public MinionJobBuilder addTask(Task task) {
        this.tasks.add(task);
        return this;
    }

    public MinionJobBuilder setJobStatuses(Set<JobStatus> jobStatuses) {
        this.jobStatuses = jobStatuses;
        return this;
    }

    public MinionJobBuilder setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }
}
