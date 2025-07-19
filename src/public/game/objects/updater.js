export function updateBox(group, object = {}) {
  if (!group || !object) return;
    
  const rect = group.querySelector('rect');
  if (!rect) return;

  const transformMap = {
    'translate': undefined,
    'rotate': undefined,
    'scale': undefined,
  };

  for (const [key, value] of Object.entries(object)) {
    const fixedAttribute = attributeFixer[key];
    if (fixedAttribute && typeof fixedAttribute == 'function') {
      const { attrName, attrValue } = fixedAttribute(object);
            
      if (attrName in transformMap) {
        transformMap[attrName] = attrValue;
        continue;
      }

      if (attrName == 'scale') {
        transformMap[attrName] = attrValue
        continue;
      }

      if (attrName == 'rotate') {
        transformMap[attrName] = attrValue
        continue;
      }

      rect.setAttribute(attrName, attrValue);
      continue;
    }

    if (!validAttributes.includes(key)) {
      continue;
    };

    rect.setAttribute(key, value);
  }

  rect.setAttribute('transform', Object.values(transformMap).join(' '));
}

const validAttributes = ['width', 'height', 'fill', 'stroke'];

const attributeFixer =  {
  position(object) {
    return {
      attrName: 'translate',
      attrValue: `translate(${object.position.x} ${object.position.z})`
    };
  },
  dimension(object) {
    return {
      attrName: 'scale',
      attrValue: `scale(${object.dimension.x} ${object.dimension.z})`
    };
  },
  rotation(object) {
    const cx = 0.5 * object.dimension.x;
    const cy = 0.5 * object.dimension.z;
    const degrees = -object.rotation.y * (180 / Math.PI);
    return {
      attrName: 'rotate',
      attrValue: `rotate(${degrees} ${cx} ${cy})`
    };
  }
};
