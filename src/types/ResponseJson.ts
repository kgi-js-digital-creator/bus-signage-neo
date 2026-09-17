export interface ResponseJson {
  status: string;
  status_msg: string;
  parameters: Record<string, string>;
  body: Body;
}

export interface Body {
  metadata: Metadata;
  routes: Record<string, Route>;
}

interface Metadata {
  descriptions: string[];
  name: string;
  statuses: Statuses;
}

interface Statuses {
  public: Status;
  school: Status;
}

interface Status {
  status: string;
  status_msg: string;
}

interface Route {
  stop: string;
  line: string;
  name: string;
  timetable: TimetableEntry[];
}

type TimetableEntry = [string | number, string];
