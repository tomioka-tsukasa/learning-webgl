export const ctrlMember = {
  selectImage: {
    name: '画像選択',
    default: '/images/sakura-sample-001.jpg',
    values: [
      '/images/sakura-sample-001.jpg',
      '/images/sakura-sample-002.jpg',
      '/images/sakura-sample-003.jpg',
    ],
  },
  lightness: {
    name: '明るさ',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.182
        },
        min: 0.0,
        max: 1.0,
      },
      ra: {
        name: '範囲',
        target: {
          value: 0.25
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uLiSt',
      ra: 'uLiRa',
      to: 'uLiTo',
    },
  },
  strengthPink: {
    name: 'ピンク強度',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.44
        },
        min: 0.0,
        max: 1.0,
      },
      ra: {
        name: '範囲',
        target: {
          value: 0.277
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uStPinkSt',
      ra: 'uStPinkRa',
      to: 'uStPinkTo',
    }
  },
  coldFilter: {
    name: '寒色フィルター',
    values: {
      st: {
        name: '強さ',
        target: {
          value: .186
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uColdSt',
      to: 'uColdTo',
    },
  },
  warmFilter: {
    name: '暖色フィルター',
    values: {
      st: {
        name: '強さ',
        target: {
          value: .18
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uWarmSt',
      to: 'uWarmTo',
    },
  },
  rStrength: {
    name: '【R】赤成分',
    values: {
      st: {
        name: '強さ',
        target: {
          value: .5
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uRSt',
      to: 'uRTo',
    },
  },
  gStrength: {
    name: '【G】緑成分',
    values: {
      st: {
        name: '強さ',
        target: {
          value: .5
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uGSt',
      to: 'uGTo',
    },
  },
  bStrength: {
    name: '【B】青成分',
    values: {
      st: {
        name: '強さ',
        target: {
          value: .5
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'オン/オフ',
        value: true,
      }
    },
    uniforms: {
      st: 'uBSt',
      to: 'uBTo',
    },
  },
}

export const setUniforms = {
  [ctrlMember.lightness.uniforms.st]: {
    value: ctrlMember.lightness.values.st.target.value
  },
  [ctrlMember.lightness.uniforms.ra]: {
    value: ctrlMember.lightness.values.ra.target.value
  },
  [ctrlMember.lightness.uniforms.to]: {
    value: ctrlMember.lightness.values.to.value
  },
  [ctrlMember.strengthPink.uniforms.st]: {
    value: ctrlMember.strengthPink.values.st.target.value
  },
  [ctrlMember.strengthPink.uniforms.ra]: {
    value: ctrlMember.strengthPink.values.ra.target.value
  },
  [ctrlMember.strengthPink.uniforms.to]: {
    value: ctrlMember.strengthPink.values.to.value
  },
  [ctrlMember.coldFilter.uniforms.st]: {
    value: ctrlMember.coldFilter.values.st.target.value
  },
  [ctrlMember.coldFilter.uniforms.to]: {
    value: ctrlMember.coldFilter.values.to.value
  },
  [ctrlMember.warmFilter.uniforms.st]: {
    value: ctrlMember.warmFilter.values.st.target.value
  },
  [ctrlMember.warmFilter.uniforms.to]: {
    value: ctrlMember.warmFilter.values.to.value
  },
  [ctrlMember.rStrength.uniforms.st]: {
    value: ctrlMember.rStrength.values.st.target.value
  },
  [ctrlMember.rStrength.uniforms.to]: {
    value: ctrlMember.rStrength.values.to.value
  },
  [ctrlMember.gStrength.uniforms.st]: {
    value: ctrlMember.gStrength.values.st.target.value
  },
  [ctrlMember.gStrength.uniforms.to]: {
    value: ctrlMember.gStrength.values.to.value
  },
  [ctrlMember.bStrength.uniforms.st]: {
    value: ctrlMember.bStrength.values.st.target.value
  },
  [ctrlMember.bStrength.uniforms.to]: {
    value: ctrlMember.bStrength.values.to.value
  },
}
