export interface PostAlert {
  service: string;
  message: string;
  logStreamUrl: string;
  emailDestinations?: string[];
}
