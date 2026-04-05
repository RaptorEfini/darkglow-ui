# Hallazgos y riesgos

Este documento enumera discrepancias relevantes detectadas durante la ingeniería inversa.

## 1. `custom-elements.json` es manual

El archivo ya refleja el catálogo actual, pero sigue siendo mantenido manualmente.

Impacto:

- puede volver a desalinearse si no se actualiza junto con cada cambio de API

## 2. Documentación previa desalineada

Los documentos existentes del repo describen parte del sistema, pero no siempre coinciden con el comportamiento real.

Ejemplos:

- defaults distintos en algunos componentes
- variantes mencionadas que no están uniformemente implementadas
- cobertura incompleta del catálogo

## 3. Dependencia fuerte de CSS global

Aunque los componentes usan Shadow DOM, sus estilos dependen de variables CSS definidas globalmente. La fuente de verdad ya es `src/tokens/theme.css`, pero el acoplamiento al tema sigue existiendo.

Impacto:

- si el consumidor no carga el tema global, la apariencia se degrada
- el encapsulamiento visual no es completamente autosuficiente

## 4. API pública parcialmente madura

Se observa una arquitectura ya bastante más coherente:

- registry
- aliases
- base class sobre `Lit`
- types centralizados

Pero aún falta cerrar del todo:

- stories por componente
- documentación viva/autogenerada
- regeneración de metadatos del catálogo

Impacto:

- la arquitectura objetivo parece más avanzada que la implementación real actual

## 5. Cobertura de Storybook insuficiente

La cobertura ya no es mínima, pero sigue lejos de cubrir todo el catálogo.

Impacto:

- menor capacidad para validar API y regresiones visuales

## Recomendaciones inmediatas

- automatizar la generación o validación de `custom-elements.json`
- ampliar Storybook para todos los componentes
