import * as React from 'react';
import { useAutocomplete, UseAutocompleteProps } from '@mui/base/useAutocomplete';
import { Button } from '@mui/base/Button';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';

const citiesAndCountries = [
    { label: 'New York, USA' },
    { label: 'London, UK' },
    { label: 'Paris, France' },
    { label: 'Tokyo, Japan' },
    { label: 'Berlin, Germany' },
    { label: 'Sydney, Australia' },
    { label: 'Toronto, Canada' },
    { label: 'Beijing, China' },
    { label: 'Moscow, Russia' },
    { label: 'Rio de Janeiro, Brazil' },
    { label: 'Istanbul, Turkey' },
    { label: 'Mumbai, India' },
    { label: 'Mexico City, Mexico' },
    { label: 'Cairo, Egypt' },
    { label: 'Dubai, UAE' }
];

const Autocomplete = React.forwardRef(function Autocomplete(
    props: UseAutocompleteProps<(typeof citiesAndCountries)[number], false, false, false> & { width?: string, height?: string },
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        disableClearable = false,
        disabled = false,
        readOnly = false,
        width = '320px',
        height = 'auto',
        ...other
    } = props;

    const {
        getRootProps,
        getInputProps,
        getPopupIndicatorProps,
        getClearProps,
        getListboxProps,
        getOptionProps,
        dirty,
        id,
        popupOpen,
        focused,
        anchorEl,
        setAnchorEl,
        groupedOptions,
    } = useAutocomplete({
        ...props,
        componentName: 'AutoCompleteInputBox',
    });

    const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

    const rootRef = useForkRef(ref, setAnchorEl);

    return (
        <React.Fragment>
            <StyledAutocompleteRoot
                {...getRootProps(other)}
                ref={rootRef}
                className={focused ? 'focused' : undefined}
                sx={{ width, height }}
            >
                <StyledInput
                    id={id}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...getInputProps()}
                />
                {hasClearIcon && (
                    <StyledClearIndicator {...getClearProps()}>
                        <ClearIcon />
                    </StyledClearIndicator>
                )}
                <StyledPopupIndicator
                    {...getPopupIndicatorProps()}
                    className={popupOpen ? 'popupOpen' : undefined}
                >
                    <ArrowDropDownIcon />
                </StyledPopupIndicator>
            </StyledAutocompleteRoot>
            {anchorEl ? (
                <Popper
                    open={popupOpen}
                    anchorEl={anchorEl}
                    slots={{
                        root: StyledPopper,
                    }}
                    modifiers={[
                        { name: 'flip', enabled: false },
                        { name: 'preventOverflow', enabled: false },
                    ]}
                >
                    <StyledListbox {...getListboxProps()}>
                        {(groupedOptions as typeof citiesAndCountries).map((option, index) => {
                            const optionProps = getOptionProps({ option, index });

                            return <StyledOption key={option.label} {...optionProps}>{option.label}</StyledOption>;
                        })}

                        {groupedOptions.length === 0 && (
                            <StyledNoOptions>No results</StyledNoOptions>
                        )}
                    </StyledListbox>
                </Popper>
            ) : null}
        </React.Fragment>
    );
});

export default function AutoCompleteInputBox({ width, height }: { width?: string, height?: string }) {
    return <Autocomplete options={citiesAndCountries} width={width} height={height} />;
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledAutocompleteRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
  width: 25px;
`,
);

// ComponentPageTabs has z-index: 1000
const StyledPopper = styled('div')`
    position: relative;
    z-index: 1001;
    max-width: 90%; /* Adjust this value to your preference */
    width: auto; /* This makes the width flexible */
`;

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  background: ${theme.palette.mode === 'dark' ? grey[900] : 'rgba(159,192,199,0.57)'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.3)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);

const StyledOption = styled('li')(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const StyledPopupIndicator = styled(Button)(
    ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px);
    }

    &.popupOpen > svg {
      transform: translateY(2px) rotate(180deg);
    }
  `,
);

const StyledClearIndicator = styled(Button)(
    ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px) scale(0.9);
    }
  `,
);

const StyledNoOptions = styled('li')`
    list-style: none;
    padding: 8px;
    cursor: default;
`;
