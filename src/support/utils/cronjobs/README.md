# Flatfile Local Cron Job Utilities

This utility helps simulate Flatfile cron events in local development environments. It allows you to test cron-based functionality without deploying to Flatfile.

## Usage

Basic usage in your listener setup:
```typescript
import { localCronJob } from "./utils/cronjobs";

// In your listener configuration
listener.use(localCronJob.start("5-minutes", "space:created"));
```

## Parameters

- First parameter: Time interval in minutes (e.g., "5-minutes" for every 5 minutes)
- Second parameter: Event name to simulate (e.g., "space:created")

## Available Events

Common Flatfile events that can be simulated:
- `space:created`
- `workbook:created`
- `sheet:created`
- And other Flatfile platform events

## Local Development

This utility is specifically designed for local development and testing. It simulates the behavior of Flatfile's production cron jobs in your local environment.

## Important Note

These cron jobs are for development purposes only and should not be used in production. In the actual Flatfile environment, these events are handled by the platform's native scheduling system.

## Example

```typescript
// Simulate space creation event every 5 minutes
listener.use(localCronJob.start("5-minutes", "space:created"));

// Simulate workbook creation event once an hour
listener.use(localCronJob.start("hourly", "workbook:created"));
```
