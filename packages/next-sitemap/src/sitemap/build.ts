import { ImageRef, AlternateRef, ISitemapField } from '../interface'
import { withXMLTemplate } from './template'

export const buildSitemapXml = (fields: ISitemapField[]): string => {
  const content = fields
    .map((fieldData) => {
      const field: Array<string> = []

      // Iterate all object keys and key value pair to field-set
      for (const key of Object.keys(fieldData)) {
        // Skip reserved keys
        if (['trailingSlash'].includes(key)) {
          continue
        }

        if (fieldData[key]) {
          if (key === 'alternateRefs') {
            field.push(buildAlternateRefsXml(fieldData.alternateRefs))
          } else if(key === 'imageRefs') {
            field.push(buildImageRefsXml(fieldData.imageRefs))
          } else {
            field.push(`<${key}>${fieldData[key]}</${key}>`)
          }
        }
      }

      // Append previous value and return
      return `<url>${field.join('')}</url>\n`
    })
    .join('')

  return withXMLTemplate(content)
}

export const buildAlternateRefsXml = (
  alternateRefs: Array<AlternateRef> = []
): string => {
  return alternateRefs
    .map((alternateRef) => {
      return `<xhtml:link rel="alternate" hreflang="${alternateRef.hreflang}" href="${alternateRef.href}"/>`
    })
    .join('')
}


export const buildImageRefsXml = (
  imageRefs: Array<ImageRef> = []
): string => {
  return imageRefs
    .map((imageRef) => {
      return imageRef.caption && imageRef.license ? 
          `<image:image>
          <image:loc>${imageRef.loc}</image:loc>
          <image:title>${imageRef.title}</image:title>
          <image:caption>${imageRef.caption}</image:caption>
          <image:license>${imageRef.license}</image:license>
          </image:image> `
      :
      `<image:image>
      <image:loc>${imageRef.loc}</image:loc>
      <image:title>${imageRef.title}</image:title>
      </image:image>`
    })
    .join('')
}
