import React, { PropsWithChildren, useState } from 'react';
import ResponsiveCard, { ResponsiveCardProps } from './ResponsiveCard';
import { Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface Props extends ResponsiveCardProps {}
const ExpandableCard = ({ children, ...props }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ResponsiveCard {...props} defaultHeight={!expanded ? '80px' : props.defaultHeight}>
      <IconButton
        icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        aria-label='expand'
        position='absolute'
        top={5}
        right={5}
        onClick={() => setExpanded(p => !p)}
      />
      <Collapse in={expanded}>{children}</Collapse>
    </ResponsiveCard>
  );
};

export default ExpandableCard;
