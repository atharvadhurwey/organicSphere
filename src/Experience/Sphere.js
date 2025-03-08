import * as THREE from "three"
import vertexShader from "./shaders/sphere/vertex.glsl"
import fragmentShader from "./shaders/sphere/fragment.glsl"
import Experience from "./Experience"

export default class Sphere {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.time = this.experience.time

    this.timeFrequency = 0.0001

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "Sphere",
        expanded: true,
      })

      this.debugFolder.addInput(this, "timeFrequency", {
        min: 0,
        max: 0.001,
        step: 0.000001,
      })
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.SphereBufferGeometry(1, 512, 512)
    this.geometry.computeTangents()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      defines: {
        USE_TANGENT: "",
      },
      uniforms: {
        uDistortionFrequency: { value: 2.0 },
        uDistortionStrength: { value: 1.0 },
        uDisplacementFrequency: { value: 2.0 },
        uDisplacementStrength: { value: 0.2 },
        uTime: { value: 0 },
      },
    })

    if (this.debug) {
      this.debugFolder.addInput(this.material.uniforms.uDistortionFrequency, "value", {
        label: "uDistortionFrequency",
        min: 0,
        max: 10,
        step: 0.001,
      })
      this.debugFolder.addInput(this.material.uniforms.uDistortionStrength, "value", {
        label: "uDistortionStrength",
        min: 0,
        max: 10,
        step: 0.001,
      })
      this.debugFolder.addInput(this.material.uniforms.uDisplacementFrequency, "value", {
        label: "uDisplacementFrequency",
        min: 0,
        max: 5,
        step: 0.001,
      })
      this.debugFolder.addInput(this.material.uniforms.uDisplacementStrength, "value", {
        label: "uDisplacementStrength",
        min: 0,
        max: 1,
        step: 0.001,
      })
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta * this.timeFrequency
  }
}
