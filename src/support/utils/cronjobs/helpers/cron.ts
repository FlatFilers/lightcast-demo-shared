import api from '@flatfile/api';
import { EventTopic } from '@flatfile/api/api';
import { CronJob } from 'cron';
import { FlatfileListener, FlatfileEvent } from '@flatfile/listener';
export class localCronJob {
    public static start(
        cronTime: "5-minutes" | "hourly" | "daily" | "weekly",
        createEvent: string
    ) : (listener: FlatfileListener) => void {
        return (listener: FlatfileListener) => {
            listener.on(
                createEvent,
                async ({ context: { accountId, spaceId, environmentId, workbookId, actorId } }: FlatfileEvent) => {
                try {
                    console.log(`@cronTime: ${cronTime}`)
                    let time =  (cronTime === "5-minutes") ? "*/5 * * * *" : 
                                (cronTime === "hourly") ? "0 */1 * * *" : 
                                (cronTime === "daily") ? "0 0 * * *" : 
                                (cronTime === "weekly") ? "0 0 * * 0" : "*/5 * * * *";
                    let topic = (cronTime === "5-minutes") ? EventTopic.Cron5Minutes : 
                                (cronTime === "hourly") ? EventTopic.CronHourly : 
                                (cronTime === "daily") ? EventTopic.CronDaily : 
                                (cronTime === "weekly") ? EventTopic.CronWeekly : EventTopic.Cron5Minutes;
                    const job = new CronJob(
                        time,
                        async function(){
                            await api.events.create({
                                context: {
                                    accountId: accountId,
                                    environmentId: environmentId,
                                    spaceId: spaceId,
                                    actorId: actorId,
                                    workbookId: workbookId
                                },
                                domain: "cron",
                                topic: topic,
                                payload: {
                                }
                            });
                        },
                        null, // onComplete
                        true, // start
                        'America/New_York' // timeZone
                    );
                } catch (error) {
                    throw error;
                }
            }
        );
        
        return listener;
        };
    }
}
