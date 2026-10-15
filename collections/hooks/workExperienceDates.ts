import type { CollectionBeforeValidateHook, DateFieldValidation } from "payload";
import { date } from "payload/shared";

/** "Currently working here" means there is no end date, so don't store a stale one. */
export const clearEndDateWhenCurrent: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.isCurrent) return { ...data, yearEnd: null };
  return data;
};

/** End date must not be before the start date. */
export const validateEndDate: DateFieldValidation = (value, options) => {
  const base = date(value, options);
  if (base !== true) return base;

  const start = (options.siblingData as { yearStart?: string | null } | undefined)?.yearStart;
  if (!value || !start) return true;
  return new Date(value) >= new Date(start) ? true : "End date must be after the start date";
};
