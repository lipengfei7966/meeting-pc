<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import i18n from '@/lang/index' // Internationalization

export default {
  name: 'app',
  provide() {
    return {
      app: this
    }
  },
  async beforeCreate() {},
  mounted() {
    $(window).resize(() => {
      this.$store.dispatch('resetSize')
    })
    $(document).ready(function() {
      $(document).on('mouseover', '.bs-new-container .is-required.is-error .el-form-item__content div', function() {
        const errorMsg =
          $(this)
            .parent('.el-form-item__content')
            .attr('data-content') || i18n.t('biz.placeholder.require')
        if (
          $(this)
            .parent('.el-form-item__content')
            .find('.el-form-item__errors').length === 0
        ) {
          $(this)
            .parent('.el-form-item__content')
            .append(`<p class='el-form-item__errors'>${errorMsg}</p>`)
        } else {
          $(this)
            .siblings('.el-form-item__errors')
            .text(errorMsg)
        }
        //   $(this)
        //     .parent('.el-form-item__content')
        //     .find('.el-form-item__errors')
        //     .show()
        //     .css('opacity', 1)
        // })
        // $(document).on('mouseover', '.bs-new-container .is-required.is-error .el-form-item__content > .el-form-item__errors', function() {
        //   $(this)
        //     .parent('.el-form-item__content')
        //     .find('.el-form-item__errors')
        //     .hide()
        // })
        // $(document).on('mouseout', '.bs-new-container .is-required.is-error .el-form-item__content > div', function() {
        //   $(this)
        //     .parent('.el-form-item__content')
        //     .find('.el-form-item__errors')
        //     .css('opacity', 0)
      })
      $(document).on('mouseover', '.el-form-item__label', function() {
        const labelMsg = $(this).html()
        // || i18n.t('biz.placeholder.require')
        if (
          $(this)
            .parent('.el-form-item')
            .find('.el-form-label__frameBox').length === 0 &&
          $(this).html().length >= 8
        ) {
          $(this)
            .parent('.el-form-item')
            .append(`<div class="el-form-label__frameBox"><div class='el-form-label__frame'>${labelMsg}</div></div>`)
        } else {
          $(this)
            .siblings('.el-form-label__frameBox')
            .children('el-form-label__frame')
            .text(labelMsg)
        }
        $(this)
          .parent('.el-form-item')
          .find('.el-form-label__frame')
          .show()
          .css('opacity', 1)

        $(document).on('mouseover', '.el-form-item__label', function() {
          $(this)
            .parent('.el-form-item')
            .find('.el-form-label__frame')
            .show()
        })
        $(document).on('mouseout', '.el-form-item__label', function() {
          $(this)
            .parent('.el-form-item')
            .find('.el-form-label__frame')
            .css('opacity', 0)
        })
      })
    })
  }
}
</script>
