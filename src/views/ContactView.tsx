import { FlexSection } from 'containers/FlexSection';
import { Note } from 'components/Note';
import { DARK_GREY } from 'constants/colors';

export const ContactView = () => {
  return (
    <FlexSection>
      <h3 style={{ color: DARK_GREY }}>Contact form coming soon!</h3>

      <Note
        header={<>Forms, validation, and error handling</>}
        body={
          <>
            <p>
              For the final page I am planning to add a mock contact form, with
              several fields of different types. The tasks will involve
              implementing form validation, <code>POST</code> ands{' '}
              <code>PATCH</code> -ing to a (mock) api that will return various
              response types, and dirty/invalid/error states.
            </p>
          </>
        }
      />
    </FlexSection>
  );
};
