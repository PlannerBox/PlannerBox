import { Badge, Popover } from 'antd';
import { CalendarViewMode, EventsWithDetailsType } from '..';
import ScheduledEventDetails from '../../../(dashboard)/schedules-management/SchedulesManagementTabs/partials/ScheduledEventDetails.tsx';

export type EventProps = {
  eventInfo: EventsWithDetailsType;
  viewMode: CalendarViewMode;
};

const Event = ({ eventInfo, viewMode }: EventProps) => {
  const e = eventInfo.event;
  const startTime = e.start
    ? `${e.start?.getHours()}h${
        e.start.getMinutes() < 10 ? '0' : ''
      }${e.start?.getMinutes()}`
    : undefined;
  const endTime = e.end
    ? `${e.end?.getHours()}h${
        e.end.getMinutes() < 10 ? '0' : ''
      }${e.end?.getMinutes()}`
    : undefined;

  let displayedText;
  switch (viewMode) {
    case 'dayGridDay':
      displayedText = `${
        startTime && endTime
          ? startTime + ' - ' + endTime + ' '
          : startTime
          ? startTime + ' '
          : ''
      }${e.title}`;
      break;
    case 'dayGridWeek':
      displayedText = `${startTime ? startTime + ' ' : ''}${e.title}`;
      break;
    case 'dayGridMonth':
    default:
      displayedText = e.title;
      break;
  }

  return (
    <Popover
      placement='leftTop'
      content={<ScheduledEventDetails event={eventInfo} />}
      trigger='click'
    >
      <Badge
        color={eventInfo.backgroundColor}
        text={displayedText}
        style={{ padding: '0 8px', overflow: 'hidden' }}
      />
    </Popover>
  );
};

export default Event;
