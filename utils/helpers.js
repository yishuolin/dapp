const formatSentence = (selected) => {
  return selected.map((word) => word.split('-')[0]).join(' ');
};

export { formatSentence };
