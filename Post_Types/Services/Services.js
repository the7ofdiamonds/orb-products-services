jQuery(document).ready(function ($) {
    const updateFeaturesListCount = () => {
        let featureListIndex = document.querySelectorAll('#feature').length;

        var newTask = `
        <div class="feature" id="feature">
            <input type="text" name="features_list[${featureListIndex}][name]" value="" placeholder="Feature Name"/>
            <input type="text" name="features_list[${featureListIndex}][cost]" value="" placeholder="Feature Cost" />
        </div>
    `;

        $('#features_list').append(newTask);
    }

    $('#add_feature_button').on('click', updateFeaturesListCount);
});
