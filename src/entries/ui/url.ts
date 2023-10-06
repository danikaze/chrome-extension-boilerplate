import { AppDispatch } from '@store';
import { updateUrl } from '@store/features/page';
import { addUrlChangeHandler } from '@utils/url-tracker';

export function trackUrlChanges(dispatch: AppDispatch): void {
  addUrlChangeHandler((url) => dispatch(updateUrl(url)));
}
