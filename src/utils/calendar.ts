/**
 * Calendar utilities for exporting events to Google Calendar and .ics format (iCalendar standard RFC 5545).
 */

interface CalendarEventInfo {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
}

function formatIsoToIcsUtc(isoString: string): string {
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generates a direct Google Calendar template URL
 */
export function getGoogleCalendarUrl(event: CalendarEventInfo): string {
  const start = formatIsoToIcsUtc(event.startDate);
  const end = formatIsoToIcsUtc(event.endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates and triggers downloading of a valid .ics calendar file
 */
export function downloadIcsFile(event: CalendarEventInfo): void {
  const start = formatIsoToIcsUtc(event.startDate);
  const end = formatIsoToIcsUtc(event.endDate);
  const now = formatIsoToIcsUtc(new Date().toISOString());
  const uid = `event-${Date.now()}@xarxa-alimenta.org`;

  // Clean description for ICS (escape commas, semicolons and newlines)
  const cleanDesc = event.description.replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const cleanTitle = event.title.replace(/,/g, '\\,');
  const cleanLoc = event.location.replace(/,/g, '\\,');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Xarxa Alimenta//Agenda v1.0//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${cleanLoc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = event.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
  link.download = `${safeFilename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
