export const ctrlMember = {
  selectImage: {
    name: '画像選択',
    default: '元々良い感じの画像',
    values: {
      '元々良い感じの画像': '/images/sakura-sample-001.jpg',
      '暗めの画像': '/images/sakura-sample-002.jpg',
      '色鮮やかな画像': '/images/sakura-sample-003.jpg',
    },
  },
  strengthPink: {
    name: 'ピンク強度',
    values: {
      st: {
        name: '強さ',
        target: {
          value: -0.154
        },
        min: -1.0,
        max: 1.0,
      },
      ra: {
        name: '範囲',
        target: {
          value: 1.0
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: true,
      }
    },
    uniforms: {
      st: 'uStPinkSt',
      ra: 'uStPinkRa',
      to: 'uStPinkTo',
    }
  },
  sakuraFilter: {
    name: '桜良い感じフィルター',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.342
        },
        min: 0.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: true,
      }
    },
    uniforms: {
      st: 'uSakuraSt',
      to: 'uSakuraTo',
    },
  },
  exposure: {
    name: '露出量',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
      }
    },
    uniforms: {
      st: 'uExSt',
      to: 'uExTo',
    },
  },
  highlights: {
    name: 'ハイライト',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
      }
    },
    uniforms: {
      st: 'uHlSt',
      to: 'uHlTo',
    },
  },
  shadows: {
    name: 'シャドウ',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.352
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: true,
      }
    },
    uniforms: {
      st: 'uShSt',
      to: 'uShTo',
    },
  },
  contrast: {
    name: 'コントラスト',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
      }
    },
    uniforms: {
      st: 'uCtSt',
      to: 'uCtTo',
    },
  },
  brilliance: {
    name: 'ブリリアンス',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
      }
    },
    uniforms: {
      st: 'uBrSt',
      to: 'uBrTo',
    },
  },
  rStrength: {
    name: '【R】赤成分',
    values: {
      st: {
        name: '強さ',
        target: {
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
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
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
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
          value: 0.0
        },
        min: -1.0,
        max: 1.0,
      },
      to: {
        name: 'on/off',
        value: false,
      }
    },
    uniforms: {
      st: 'uBSt',
      to: 'uBTo',
    },
  },
}

export const setUniforms = {
  [ctrlMember.strengthPink.uniforms.st]: {
    value: ctrlMember.strengthPink.values.st.target.value
  },
  [ctrlMember.strengthPink.uniforms.ra]: {
    value: ctrlMember.strengthPink.values.ra.target.value
  },
  [ctrlMember.strengthPink.uniforms.to]: {
    value: ctrlMember.strengthPink.values.to.value
  },
  [ctrlMember.sakuraFilter.uniforms.st]: {
    value: ctrlMember.sakuraFilter.values.st.target.value
  },
  [ctrlMember.sakuraFilter.uniforms.to]: {
    value: ctrlMember.sakuraFilter.values.to.value
  },
  [ctrlMember.exposure.uniforms.st]: {
    value: ctrlMember.exposure.values.st.target.value
  },
  [ctrlMember.exposure.uniforms.to]: {
    value: ctrlMember.exposure.values.to.value
  },
  [ctrlMember.highlights.uniforms.st]: {
    value: ctrlMember.highlights.values.st.target.value
  },
  [ctrlMember.highlights.uniforms.to]: {
    value: ctrlMember.highlights.values.to.value
  },
  [ctrlMember.shadows.uniforms.st]: {
    value: ctrlMember.shadows.values.st.target.value
  },
  [ctrlMember.shadows.uniforms.to]: {
    value: ctrlMember.shadows.values.to.value
  },
  [ctrlMember.contrast.uniforms.st]: {
    value: ctrlMember.contrast.values.st.target.value
  },
  [ctrlMember.contrast.uniforms.to]: {
    value: ctrlMember.contrast.values.to.value
  },
  [ctrlMember.brilliance.uniforms.st]: {
    value: ctrlMember.brilliance.values.st.target.value
  },
  [ctrlMember.brilliance.uniforms.to]: {
    value: ctrlMember.brilliance.values.to.value
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
